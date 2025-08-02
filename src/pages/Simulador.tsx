import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Brain, ArrowLeft, Sparkles, FileText, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Simulador = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [descricaoServico, setDescricaoServico] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [proposta, setProposta] = useState("");

  const generateProposta = async () => {
    if (!nomeEmpresa || !descricaoServico) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o nome da empresa e a descrição do serviço, se não vai sair no rola comigo!",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulação de chamada da IA
    setTimeout(() => {
      const propostaGerada = `
# PROPOSTA DE CONSULTORIA EMPRESARIAL
## Empresa: ${nomeEmpresa}

### DIAGNÓSTICO INICIAL
Baseado na descrição fornecida: "${descricaoServico}", nossa IA identificou as seguintes oportunidades:

### SOLUÇÕES RECOMENDADAS

**1. ANÁLISE ESTRATÉGICA COMPLETA**
- Avaliação de mercado e posicionamento competitivo
- Identificação de gaps operacionais
- Mapeamento de processos críticos
- Valor: R$ 3.500

**2. IMPLEMENTAÇÃO DE MELHORIAS**
- Otimização de processos identificados
- Automação de tarefas repetitivas
- Treinamento de equipes
- Valor: R$ 5.800

**3. ACOMPANHAMENTO E KPIs**
- Dashboard personalizado de performance
- Métricas de ROI em tempo real
- Relatórios mensais de progresso
- Valor: R$ 2.200

### CRONOGRAMA ESTIMADO
- **Fase 1 (Diagnóstico):** 2 semanas
- **Fase 2 (Implementação):** 4-6 semanas  
- **Fase 3 (Acompanhamento):** Ongoing

### INVESTIMENTO TOTAL
**R$ 11.500** (Parcelamento em até 6x sem juros)

### GARANTIAS
✅ Satisfação garantida ou seu dinheiro de volta
✅ Suporte técnico por 6 meses incluído
✅ Revisões trimestrais sem custo adicional

### PRÓXIMOS PASSOS
1. Agendar reunião de alinhamento (30 min)
2. Assinatura do contrato e início imediato
3. Primeiro relatório em 7 dias

*Esta proposta foi gerada pela nossa IA avançada e pode ser personalizada conforme suas necessidades específicas.*
      `;
      
      setProposta(propostaGerada);
      setIsLoading(false);
      
      toast({
        title: "Proposta gerada com sucesso!",
        description: "Sua proposta personalizada está pronta.",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-bold">Simulador de Propostas</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
              <h1 className="text-3xl lg:text-4xl font-bold">
                Gere sua Proposta com IA
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nossa inteligência artificial analisará suas necessidades e criará uma proposta 
              personalizada de consultoria empresarial em poucos minutos.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulário */}
            <Card className="lg:sticky lg:top-24 h-fit">
              <CardHeader className="space-y-2">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Informações da Sua Empresa
                </CardTitle>
                <CardDescription>
                  Preencha os dados abaixo para gerar uma proposta personalizada
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nomeEmpresa">Nome da Empresa *</Label>
                  <Input
                    id="nomeEmpresa"
                    placeholder="Ex: TechStart Ltda"
                    value={nomeEmpresa}
                    onChange={(e) => setNomeEmpresa(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricaoServico">Descrição do Serviço Desejado *</Label>
                  <Textarea
                    id="descricaoServico"
                    placeholder="Descreva detalhadamente qual tipo de consultoria você precisa, os principais desafios da sua empresa e quais resultados espera alcançar..."
                    value={descricaoServico}
                    onChange={(e) => setDescricaoServico(e.target.value)}
                    className="min-h-[120px] resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Quanto mais detalhada for a descrição, mais precisa será a proposta gerada.
                  </p>
                </div>

                <Button 
                  onClick={generateProposta}
                  disabled={isLoading}
                  className="w-full h-12 text-lg"
                  variant="hero"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Gerando proposta...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Gerar Proposta
                    </div>
                  )}
                </Button>

                {isLoading && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                    <Clock className="w-4 h-4" />
                    Isso pode levar alguns instantes...
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Área de Resposta */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    Proposta Gerada pela IA
                  </CardTitle>
                  <CardDescription>
                    {proposta ? 
                      "Sua proposta personalizada está pronta! Você pode salvá-la ou solicitar ajustes." :
                      "Preencha o formulário ao lado para gerar sua proposta personalizada."
                    }
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {proposta ? (
                    <div className="space-y-4">
                      <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
                          {proposta}
                        </pre>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1">
                          Baixar PDF
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Enviar por Email
                        </Button>
                        <Button variant="default" className="flex-1">
                          Contratar Serviço
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                        <FileText className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium">Aguardando informações</p>
                        <p className="text-sm text-muted-foreground">
                          Complete o formulário para ver sua proposta personalizada aqui
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Informações adicionais */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-primary">Como funciona nossa IA?</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>Análise automática das necessidades da sua empresa</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>Comparação com base de dados de mais de 10.000 casos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>Geração de proposta customizada com cronograma e investimento</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>Validação por consultores especialistas certificados</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulador;