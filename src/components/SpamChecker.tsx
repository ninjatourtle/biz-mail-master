import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface SpamCheckResult {
  score: number;
  issues: string[];
  suggestions: string[];
}

interface SpamCheckerProps {
  emailContent?: string;
}

export function SpamChecker({ emailContent = "" }: SpamCheckerProps) {
  const [content, setContent] = useState(emailContent);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<SpamCheckResult | null>(null);

  const checkSpam = () => {
    setChecking(true);
    const textToCheck = emailContent || content;
    setTimeout(() => {
      const score = Math.random() * 100;
      setResult({
        score: Math.round(score),
        issues: score > 50 ? [
          "Слишком много восклицательных знаков",
          "Использование слов-триггеров: 'бесплатно', 'срочно'",
          "Отсутствие ссылки отписки"
        ] : [],
        suggestions: [
          "Добавьте персонализацию",
          "Используйте более нейтральный язык",
          "Проверьте SPF и DKIM записи"
        ]
      });
      setChecking(false);
    }, 1500);
  };

  const getScoreColor = (score: number) => {
    if (score < 30) return "text-gradient-green";
    if (score < 60) return "text-gradient-yellow";
    return "text-gradient-red";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Проверка на спам
        </CardTitle>
        <CardDescription>
          Проверьте письмо перед отправкой
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!emailContent && (
          <Textarea
            placeholder="Вставьте текст письма для проверки..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[150px]"
          />
        )}
        
        <Button 
          onClick={checkSpam} 
          disabled={(!content && !emailContent) || checking}
          className="w-full"
        >
          {checking ? "Проверка..." : "Проверить на спам"}
        </Button>

        {result && (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Спам-рейтинг</span>
                <span className={`font-bold ${getScoreColor(result.score)}`}>
                  {result.score}%
                </span>
              </div>
              <Progress value={result.score} className="h-2" />
            </div>

            {result.issues.length > 0 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    {result.issues.map((issue, i) => (
                      <div key={i} className="text-sm">• {issue}</div>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <span className="text-sm font-medium">Рекомендации:</span>
              {result.suggestions.map((suggestion, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-gradient-green mt-0.5" />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}