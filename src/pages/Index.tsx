import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function Index() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Введите описание",
        description: "Опишите видео, которое хотите создать",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 800);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsGenerating(false);
        setProgress(0);
        toast({
          title: "Видео готово! 🎬",
          description: "Ваше реалистичное видео успешно сгенерировано"
        });
      }, 500);
    }, 8000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="font-heading text-6xl md:text-8xl font-bold mb-4 gradient-text">
            VideoGen AI
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Создавайте реалистичные видео до часа одной строчкой
          </p>
        </header>

        <section className="mb-20">
          <Card className="border-2 border-primary/20 shadow-2xl shadow-primary/10 backdrop-blur-sm bg-card/50">
            <CardHeader>
              <CardTitle className="font-heading text-3xl flex items-center gap-2">
                <Icon name="Sparkles" className="text-primary" size={32} />
                Генератор видео
              </CardTitle>
              <CardDescription className="text-base">
                Опишите что вы хотите увидеть — ИИ создаст реалистичное видео
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-lg">Описание видео</Label>
                <Textarea
                  id="prompt"
                  placeholder="Например: Красивый закат на океанском побережье, волны разбиваются о скалы, летают чайки..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-32 text-base resize-none border-primary/30 focus:border-primary"
                  disabled={isGenerating}
                />
              </div>

              {isGenerating && (
                <div className="space-y-2 animate-fade-in">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Генерация...</span>
                    <span className="text-primary font-semibold">{progress}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-bg transition-all duration-300 animate-pulse-glow"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full gradient-bg text-lg py-6 font-semibold hover:opacity-90 transition-opacity"
              >
                {isGenerating ? (
                  <>
                    <Icon name="Loader2" className="animate-spin mr-2" size={24} />
                    Создаём видео...
                  </>
                ) : (
                  <>
                    <Icon name="Play" className="mr-2" size={24} />
                    Генерировать видео
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="mb-20">
          <h2 className="font-heading text-4xl font-bold mb-8 text-center gradient-text">
            Частые вопросы
          </h2>
          <Card className="border-primary/20 backdrop-blur-sm bg-card/50">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg hover:text-primary">
                    Какой максимальный хронометраж видео?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    Наш ИИ может создавать видео длительностью до 1 часа с реалистичной картинкой и плавными движениями.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg hover:text-primary">
                    Как долго генерируется видео?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    В среднем 5-15 минут в зависимости от длительности. Короткие ролики до минуты готовы за 2-3 минуты.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg hover:text-primary">
                    В каком качестве получается видео?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    Все видео генерируются в Full HD (1920x1080) с возможностью апскейла до 4K. Частота кадров — 30 FPS.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg hover:text-primary">
                    Можно ли редактировать готовое видео?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    Да! После генерации вы можете изменить описание отдельных сцен и перегенерировать их без потери остального материала.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="font-heading text-4xl font-bold mb-8 text-center gradient-text">
            Связаться с нами
          </h2>
          <Card className="border-primary/20 backdrop-blur-sm bg-card/50">
            <CardContent className="pt-6">
              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                toast({
                  title: "Сообщение отправлено! ✉️",
                  description: "Мы свяжемся с вами в ближайшее время"
                });
              }}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">Имя</Label>
                    <Input
                      id="name"
                      placeholder="Ваше имя"
                      className="border-primary/30 focus:border-primary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="border-primary/30 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-base">Сообщение</Label>
                  <Textarea
                    id="message"
                    placeholder="Ваш вопрос или предложение..."
                    className="min-h-32 resize-none border-primary/30 focus:border-primary"
                    required
                  />
                </div>

                <Button type="submit" className="w-full gradient-bg text-lg py-6 font-semibold hover:opacity-90 transition-opacity">
                  <Icon name="Send" className="mr-2" size={20} />
                  Отправить сообщение
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        <footer className="mt-20 text-center text-muted-foreground">
          <p className="text-sm">© 2025 VideoGen AI. Создано с помощью передовых технологий ИИ</p>
        </footer>
      </div>
    </div>
  );
}
