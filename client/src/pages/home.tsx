import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/Logo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Bot, 
  Code, 
  Link, 
  Settings, 
  CheckCircle, 
  Mail, 
  MessageCircle,
  Send,
  Zap,
  Clock,
  TrendingUp
} from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Smooth scrolling for anchor links
    const handleClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(target.getAttribute('href')!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      contact: "",
      message: "",
    },
  });

  const submitContactForm = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Заявку відправлено!",
        description: "Дякуємо за звернення. Відповім протягом 2 годин.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Помилка",
        description: error.message || "Не вдалося відправити заявку. Спробуйте пізніше.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    submitContactForm.mutate(data);
  };

  const partners = [
    {
      name: "TechCorp Solutions",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=150",
      website: "https://techcorp.example.com"
    },
    {
      name: "Digital Innovate",
      logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=150",
      website: "https://digitalinnovate.example.com"
    },
    {
      name: "Business Pro",
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=150",
      website: "https://businesspro.example.com"
    },
    {
      name: "Smart Systems",
      logo: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=150",
      website: "https://smartsystems.example.com"
    },
    {
      name: "Modern Enterprise",
      logo: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=150",
      website: "https://modernenterprise.example.com"
    },
    {
      name: "Future Tech",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=150",
      website: "https://futuretech.example.com"
    }
  ];

  const services = [
    {
      icon: Bot,
      title: "Telegram-боти для бізнесу",
      description: "Розумні помічники для клієнтського сервісу, продажів та консультацій. Працюють 24/7 без перерв",
      gradient: "from-blue-50 to-violet-50 dark:from-blue-950/50 dark:to-violet-950/50"
    },
    {
      icon: Code,
      title: "Веб-додатки на замовлення",
      description: "Індивідуальні системи для управління бізнесом, аналітики та внутрішніх процесів компанії",
      gradient: "from-violet-50 to-cyan-50 dark:from-violet-950/50 dark:to-cyan-950/50"
    },
    {
      icon: Link,
      title: "Інтеграція систем",
      description: "Об'єднання різних сервісів та платформ в єдину екосистему для зручного управління",
      gradient: "from-cyan-50 to-blue-50 dark:from-cyan-950/50 dark:to-blue-950/50"
    },
    {
      icon: Settings,
      title: "Цифровізація процесів",
      description: "Перетворення паперових та ручних процесів у цифрові рішення для підвищення ефективності",
      gradient: "from-blue-50 to-violet-50 dark:from-blue-950/50 dark:to-violet-950/50"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo/>
            <nav className="hidden md:flex space-x-8">
              <a href="#testimonials" className="text-muted-foreground hover:text-brand-blue transition-colors" data-testid="nav-testimonials">
                Партнери
              </a>
              <a href="#services" className="text-muted-foreground hover:text-brand-blue transition-colors" data-testid="nav-services">
                Рішення
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-brand-blue transition-colors" data-testid="nav-contact">
                Контакти
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <a href="#contact" data-testid="button-order-project">
                <Button className="bg-brand-blue hover:bg-blue-600">
                  Отримати консультацію
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`pt-24 pb-16 bg-gradient-to-br from-background to-muted transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-6" data-testid="text-hero-title">
                Розробляємо IT-рішення для{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-violet">
                  вашої компанії
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8" data-testid="text-hero-description">
                Створюємо індивідуальні рішення: від Telegram-ботів до корпоративних систем. 
                Швидкий запуск, надійність та підтримка 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#contact" data-testid="button-free-consultation">
                  <Button size="lg" className="bg-brand-blue hover:bg-blue-600 w-full sm:w-auto">
                    Отримати консультацію
                  </Button>
                </a>
                <a href="#services" data-testid="button-view-services">
                  <Button variant="outline" size="lg" className="border-brand-blue text-brand-blue hover:bg-blue-50 dark:hover:bg-blue-950/20 w-full sm:w-auto">
                    Наші рішення
                  </Button>
                </a>
              </div>
              <div className="grid grid-cols-2 gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span data-testid="text-projects-count">Сучасні технології</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span data-testid="text-experience">Запуск: 2-4 тижні</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span data-testid="text-automation">Підтримка 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span data-testid="text-guarantee">100% гарантія якості</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Modern workspace with laptop" 
                className="rounded-2xl shadow-2xl"
                data-testid="img-hero-workspace"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-card-foreground" data-testid="text-online-status">Системи працюють 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-testimonials-title">Наші партнери</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-testimonials-description">Компанії, які довіряють нам свої бізнес-рішення</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <a 
                key={index} 
                href={partner.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block"
                data-testid={`link-partner-${index}`}
              >
                <Card className="bg-card shadow-sm border-border hover:shadow-lg transition-all duration-300 group-hover:border-brand-blue/50" data-testid={`card-partner-${index}`}>
                  <CardContent className="p-6 text-center">
                    <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/20 dark:to-violet-950/20 flex items-center justify-center">
                      <img 
                        src={partner.logo} 
                        alt={`${partner.name} logo`}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        data-testid={`img-partner-logo-${index}`}
                      />
                    </div>
                    <h3 className="font-semibold text-card-foreground group-hover:text-brand-blue transition-colors" data-testid={`text-partner-name-${index}`}>
                      {partner.name}
                    </h3>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-card-foreground mb-4" data-testid="text-services-title">Наші IT-рішення</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-services-description">
              Розробляємо сучасні цифрові інструменти для ефективного ведення бізнесу
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`text-center p-6 rounded-2xl bg-gradient-to-br ${service.gradient} hover:shadow-lg transition-shadow border border-border/50`}
                data-testid={`card-service-${index}`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue rounded-xl mb-4">
                  <service.icon className="w-8 h-8 text-white" data-testid={`icon-service-${index}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2" data-testid={`text-service-title-${index}`}>
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed" data-testid={`text-service-description-${index}`}>
                  {service.description}
                </p>
                <CheckCircle className="w-5 h-5 text-green-500 mx-auto" data-testid={`icon-service-check-${index}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-violet">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-4" data-testid="text-bonus-title">Спеціальна пропозиція для клієнтів сайту</h2>
            <p className="text-xl text-white/90 mb-6" data-testid="text-bonus-description">
              Безкоштовна технічна консультація та знижка 15% на розробку при замовленні через сайт.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white/20 px-4 py-2 rounded-full text-white font-semibold" data-testid="text-bonus-price">
                🎁 Знижка 15% + безкоштовна консультація
              </div>
              <a href="#contact" data-testid="button-get-consultation">
                <Button className="bg-white text-brand-blue hover:bg-gray-100">
                  Отримати консультацію
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-contact-title">Безкоштовна консультація</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-contact-description">
              Опишіть ваші завдання та отримайте технічні рекомендації та пропозицію зі знижкою 15%
            </p>
          </div>
          
          <Card className="shadow-lg border-border bg-card">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="label-name">Ваше ім'я</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Як до вас звертатися?" 
                              {...field}
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="label-contact">Email або Telegram</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="email@example.com або @username" 
                              {...field}
                              data-testid="input-contact"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel data-testid="label-message">Опис завдання або проекту</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={5}
                            placeholder="Наприклад: 'Потрібен Telegram-бот для приймання замовлень в кав'ярні' або 'Хочемо створити систему управління клієнтами'"
                            {...field}
                            data-testid="textarea-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="text-center">
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={submitContactForm.isPending}
                      className="bg-brand-blue hover:bg-blue-600"
                      data-testid="button-submit-form"
                    >
                      {submitContactForm.isPending ? (
                        "Відправляємо..."
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Отримати консультацію
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground text-center" data-testid="text-privacy-notice">
                    Відповім з технічними рекомендаціями та комерційною пропозицією протягом 24 годин. Ваші дані захищені.
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-card-foreground mb-4" data-testid="text-contact-info-title">Прямий зв'язок</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-contact-info-description">
              Оберіть зручний канал для обговорення ROI вашого проекту
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/20 dark:to-violet-950/20 border-border">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue rounded-xl mb-4">
                  <MessageCircle className="w-8 h-8 text-white" data-testid="icon-telegram" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-telegram-title">Telegram</h3>
                <p className="text-muted-foreground mb-4" data-testid="text-telegram-description">Швидка відповідь з попереднім розрахунком</p>
                <a href="https://t.me/devbot_freelancer" data-testid="link-telegram">
                  <Button className="bg-brand-blue hover:bg-blue-600">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Почати в Telegram
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-violet-50 to-cyan-50 dark:from-violet-950/20 dark:to-cyan-950/20 border-border">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-violet rounded-xl mb-4">
                  <Mail className="w-8 h-8 text-white" data-testid="icon-email" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-email-title">Email</h3>
                <p className="text-muted-foreground mb-4" data-testid="text-email-description">Детальне комерційне обговорення</p>
                <a href="mailto:dev@example.com" data-testid="link-email">
                  <Button className="bg-brand-violet hover:bg-purple-600">
                    <Mail className="w-5 h-5 mr-2" />
                    Написати Email
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-xl font-bold text-brand-blue mb-4" data-testid="text-footer-logo">TryKachka</div>
              <p className="text-slate-400 mb-4" data-testid="text-footer-description">
                Розробляємо індивідуальні IT-рішення для оптимізації бізнес-процесів. Якість, швидкість, результат.
              </p>
              <div className="flex space-x-4">
                <a href="https://t.me/devbot_freelancer" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-telegram">
                  <MessageCircle className="w-6 h-6" />
                </a>
                <a href="mailto:dev@example.com" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-email">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4" data-testid="text-footer-services-title">Рішення</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#services" className="hover:text-white transition-colors" data-testid="link-footer-telegram-bots">Telegram-боти</a></li>
                <li><a href="#services" className="hover:text-white transition-colors" data-testid="link-footer-web-apps">Веб-додатки</a></li>
                <li><a href="#services" className="hover:text-white transition-colors" data-testid="link-footer-api">Інтеграції</a></li>
                <li><a href="#services" className="hover:text-white transition-colors" data-testid="link-footer-automation">Цифровізація</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4" data-testid="text-footer-info-title">Проекти</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#services" className="hover:text-white transition-colors" data-testid="link-footer-portfolio">Наші рішення</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors" data-testid="link-footer-reviews">Партнери</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors" data-testid="link-footer-contacts">Контакти</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors" data-testid="link-footer-consultation">Консультація</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 dark:border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p data-testid="text-footer-copyright">&copy; 2024 TryKachka. Якісні IT-рішення для вашого бізнесу.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
