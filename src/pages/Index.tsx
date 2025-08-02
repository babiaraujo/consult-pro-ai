import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Brain, Zap, Target, Users, TrendingUp, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-jiu-jitsu-business.jpg";
import logoJiuVigor from "@/assets/logo-jiu-vigor.png";

const Index = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Consultoria Estratégica",
      description: "Análise completa do seu negócio com soluções personalizadas geradas por IA",
      price: "A partir de R$ 2.500",
      features: ["Análise SWOT automatizada", "Roadmap estratégico", "KPIs personalizados"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Automação de Processos",
      description: "Otimize suas operações com automação inteligente e redução de custos",
      price: "A partir de R$ 3.800",
      features: ["Mapeamento de processos", "Implementação de IA", "ROI garantido"]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Marketing Digital",
      description: "Estratégias data-driven para aumentar seu alcance e conversões",
      price: "A partir de R$ 1.900",
      features: ["Análise de mercado", "Estratégia omnichannel", "Dashboard em tempo real"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Gestão de Pessoas",
      description: "Desenvolvimento de equipes e cultura organizacional orientada por dados",
      price: "A partir de R$ 2.200",
      features: ["Assessment comportamental", "Plano de desenvolvimento", "Cultura data-driven"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Análise Financeira",
      description: "Diagnóstico financeiro completo com projeções e cenários",
      price: "A partir de R$ 3.200",
      features: ["Modelagem financeira", "Análise de viabilidade", "Projeções automatizadas"]
    }
  ];

  const benefits = [
    "Propostas geradas em até 24 horas",
    "Metodologia proprietária com IA",
    "Consultores especialistas certificados",
    "Garantia de satisfação",
    "Acompanhamento pós-implementação"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoJiuVigor} alt="Logo Jiu do Vigor" className="w-10 h-10" />
            <h1 className="text-xl font-bold">Consultoria Jiu do Vigor</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#servicos" className="text-sm font-medium hover:text-primary transition-colors">Serviços</a>
            <a href="#como-funciona" className="text-sm font-medium hover:text-primary transition-colors">Como Funciona</a>
            <a href="#beneficios" className="text-sm font-medium hover:text-primary transition-colors">Benefícios</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-hero to-background py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  🚀 Powered by AI
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-hero-foreground leading-tight">
                  Consultoria
                  <span className="text-primary"> Empresarial</span> do Futuro
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Gere propostas personalizadas de consultoria empresarial em minutos com nossa IA avançada. 
                  Transforme seu negócio com soluções inteligentes e data-driven.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  variant="hero"
                  onClick={() => navigate('/simulador')}
                  className="text-lg px-8 py-6"
                >
                  Quero simular uma proposta!
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Ver Cases de Sucesso
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Empresas Atendidas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Satisfação</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24h</div>
                  <div className="text-sm text-muted-foreground">Entrega Média</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroImage} 
                alt="Consultoria empresarial com IA" 
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="w-fit mx-auto">
              Nossos Serviços
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold">
              Soluções Completas para seu Negócio
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Oferecemos uma gama completa de serviços de consultoria empresarial, 
              todos potencializados por inteligência artificial para resultados excepcionais.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
                <CardHeader className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {service.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold text-primary">{service.price}</div>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full mt-4">
                    Saiba Mais
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  Por que escolher a ConsultIA Pro?
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Resultados Comprovados com Tecnologia de Ponta
                </h2>
                <p className="text-lg text-muted-foreground">
                  Nossa plataforma combina expertise humana com inteligência artificial para 
                  entregar soluções precisas e personalizadas para cada negócio.
                </p>
              </div>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button 
                size="lg" 
                variant="hero"
                onClick={() => navigate('/simulador')}
                className="text-lg px-8 py-6"
              >
                Começar Agora
              </Button>
            </div>

            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-border/50">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Brain className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">IA Avançada</h3>
                      <p className="text-sm text-muted-foreground">Análise inteligente de dados</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Soluções Personalizadas</h3>
                      <p className="text-sm text-muted-foreground">Adaptadas ao seu negócio</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-glow/10 rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary-glow" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Resultados Rápidos</h3>
                      <p className="text-sm text-muted-foreground">Implementação ágil</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground">
              Pronto para Transformar seu Negócio?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Gere sua proposta personalizada em poucos minutos e descubra como 
              nossa consultoria pode acelerar o crescimento da sua empresa.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/simulador')}
              className="text-lg px-12 py-6 bg-background text-foreground hover:bg-background/90"
            >
              Quero simular uma proposta!
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={logoJiuVigor} alt="Logo Jiu do Vigor" className="w-6 h-6" />
              <span className="font-semibold">Consultoria Jiu do Vigor</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Consultoria Jiu do Vigor. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;