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
    setProposta("");
    
    try {
      const response = await fetch('https://babi-imersao.app.n8n.cloud/webhook/gerar-proposta-sistema', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome_empresa: nomeEmpresa,
          descricao: descricaoServico
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar proposta');
      }

      const data = await response.text();
      
      // Processar e limpar o texto completamente
      let processedData = data;
      
      // Tentar parsear como JSON primeiro
      try {
        const jsonData = JSON.parse(data);
        processedData = jsonData.output || data;
      } catch {
        // Se não for JSON válido, limpar manualmente
        processedData = data
          .replace(/^\s*\{\s*"output"\s*:\s*"/, '') // Remove {"output":"
          .replace(/"\s*\}\s*$/, '') // Remove "}
          .replace(/^"/, '') // Remove aspas do início
          .replace(/"$/, ''); // Remove aspas do final
      }
      
      // Processar quebras de linha e limpar caracteres de escape
      processedData = processedData
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\')
        .trim();
      
      setProposta(processedData);
      
      toast({
        title: "Proposta gerada!",
        description: "Sua proposta personalizada foi criada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar proposta",
        description: "Ocorreu um erro ao conectar com nossa IA. Tente novamente.",
        variant: "destructive",
      });
      setProposta("Erro ao gerar proposta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
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
              <h1 className="text-xl font-bold">Simulador de Propostas - Jiu Jitsu Core</h1>
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
                      <div className="bg-muted/30 rounded-lg p-6 border border-border/50 relative">
                        {isLoading ? (
                          <div className="flex flex-col items-center justify-center py-8 space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                              <Brain className="w-6 h-6 text-primary animate-pulse" />
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                              </div>
                            </div>
                            <div className="text-center space-y-2">
                              <p className="text-lg font-medium text-primary">IA Analisando...</p>
                              <p className="text-sm text-muted-foreground animate-pulse">
                                Processando suas informações para gerar a melhor proposta
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="prose prose-sm max-w-none">
                            <div className="bg-gradient-to-br from-background to-muted/20 rounded-lg p-6 border-l-4 border-primary">
                              <div className="space-y-4">
                                {proposta.split('\n\n').map((paragraph, index) => {
                                  if (paragraph.trim() === '') return null;
                                  
                                  // Verificar se é um título/seção (começa com - ou contém :)
                                  if (paragraph.includes('- ') || paragraph.includes(':')) {
                                    return (
                                      <div key={index} className="space-y-2">
                                        {paragraph.split('\n').map((line, lineIndex) => {
                                          if (line.trim().startsWith('- ')) {
                                            return (
                                              <div key={lineIndex} className="flex items-start gap-3 py-1">
                                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                                <p className="text-foreground leading-relaxed">{line.replace('- ', '')}</p>
                                              </div>
                                            );
                                          } else if (line.includes(':') && line.length < 100) {
                                            return (
                                              <h4 key={lineIndex} className="font-semibold text-lg text-primary mt-6 mb-2">
                                                {line}
                                              </h4>
                                            );
                                          } else {
                                            return (
                                              <p key={lineIndex} className="text-foreground leading-relaxed">
                                                {line}
                                              </p>
                                            );
                                          }
                                        })}
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <p key={index} className="text-foreground leading-relaxed text-base">
                                        {paragraph}
                                      </p>
                                    );
                                  }
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {!isLoading && (
                        <div className="flex gap-3">
                          <Button variant="outline" className="flex-1" disabled>
                            Baixar PDF
                          </Button>
                          <Button variant="outline" className="flex-1" disabled>
                            Enviar por Email
                          </Button>
                          <Button variant="default" className="flex-1" disabled>
                            Contratar Serviço
                          </Button>
                        </div>
                      )}
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