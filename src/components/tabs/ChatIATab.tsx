import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles, Database } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "Top 5 improdutividades do mês",
  "Horas produtivas por equipe hoje",
  "Qual equipamento tem maior disponibilidade?",
  "Resumo de manutenções da semana",
  "Qual equipe mais eficiente?",
];

const mockResponses: Record<string, string> = {
  "top 5 improdutividades": `📊 **Top 5 Motivos de Improdutividade (Mês)**

1. **Deslocamento** - 45h (32%)
2. **Aguardando Peças** - 28h (20%)
3. **Parada Refeição** - 25h (18%)
4. **Abastecimento** - 22h (16%)
5. **Troca de Operador** - 20h (14%)

*Total: 140h de tempo improdutivo registrado.*`,

  "horas produtivas por equipe": `📈 **Horas Produtivas por Equipe (Hoje)**

• **Equipe Alpha**: 24h
• **Equipe Beta**: 22h
• **Equipe Gamma**: 20h

*Total do dia: 66h produtivas*`,

  "equipamento maior disponibilidade": `🏆 **Disponibilidade de Equipamentos**

1. **Colheitadeira S790** - 95.5%
2. **Distribuidor Stara** - 95.1%
3. **Trator Case IH** - 94.0%
4. **Trator John Deere 8R** - 92.3%
5. **Pulverizador Uniport** - 89.8%

*A Colheitadeira S790 apresenta a maior disponibilidade da frota.*`,

  "manutenções da semana": `🔧 **Resumo de Manutenções (Semana)**

**Preventivas**: 28h (61%)
- Troca óleo e filtros: 8h
- Calibração bicos: 6h
- Revisão geral: 14h

**Corretivas**: 18h (39%)
- Substituição correia: 8h
- Reparos diversos: 10h

*Disponibilidade média da frota: 93.3%*`,

  "equipe mais eficiente": `🥇 **Ranking de Eficiência**

1. **Equipe Alpha** - 88.5%
2. **Equipe Beta** - 86.0%
3. **Equipe Gamma** - 84.0%

*A Equipe Alpha lidera com 185h produtivas e apenas 24h improdutivas.*`,
};

function findResponse(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('improdutiv')) {
    return mockResponses["top 5 improdutividades"];
  }
  if (lowerQuery.includes('produtiv') && lowerQuery.includes('equipe')) {
    return mockResponses["horas produtivas por equipe"];
  }
  if (lowerQuery.includes('equipamento') || lowerQuery.includes('disponibilidade')) {
    return mockResponses["equipamento maior disponibilidade"];
  }
  if (lowerQuery.includes('manuten')) {
    return mockResponses["manutenções da semana"];
  }
  if (lowerQuery.includes('eficien') || lowerQuery.includes('melhor equipe')) {
    return mockResponses["equipe mais eficiente"];
  }
  
  return `🤖 Analisei os dados carregados, mas não encontrei informações específicas para essa consulta.

**Tente perguntar sobre:**
- Horas produtivas/improdutivas
- Performance das equipes
- Disponibilidade de equipamentos
- Manutenções realizadas

*Lembre-se: só posso responder com base nos dados carregados do OneDrive.*`;
}

export function ChatIATab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = findResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-280px)] min-h-[500px]">
      {/* Chat Area */}
      <Card className="lg:col-span-3 flex flex-col">
        <CardHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">Assistente Agroanalytics</CardTitle>
              <p className="text-sm text-muted-foreground">
                Consulte dados operacionais em linguagem natural
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
              <Database className="h-3.5 w-3.5" />
              <span>Dados locais</span>
            </div>
          </div>
        </CardHeader>

        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Como posso ajudar?</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Faça perguntas sobre seus dados operacionais. Todas as respostas são baseadas exclusivamente nos dados carregados.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 animate-slide-up",
                    message.role === 'user' ? "flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    message.role === 'user' 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={cn(
                    "rounded-xl px-4 py-3 max-w-[80%]",
                    message.role === 'user' 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-foreground"
                  )}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs opacity-60 mt-1 block">
                      {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 animate-fade-in">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted rounded-xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        <div className="border-t border-border p-4">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua pergunta sobre os dados..."
              className="flex-1"
            />
            <Button type="submit" disabled={!input.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>

      {/* Suggestions Sidebar */}
      <Card className="lg:col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-secondary" />
            Sugestões
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {suggestedQuestions.map((question, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start text-left h-auto py-3 px-3 text-sm hover:bg-primary/5 hover:text-primary"
              onClick={() => handleSuggestion(question)}
            >
              {question}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
