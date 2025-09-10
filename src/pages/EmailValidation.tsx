import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertCircle, Upload, Download, RefreshCw, Shield, Mail, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { SpamChecker } from "@/components/SpamChecker";

interface ValidationResult {
  email: string;
  status: "valid" | "invalid" | "risky" | "unknown";
  reason?: string;
  score: number;
}

const mockResults: ValidationResult[] = [
  { email: "user@gmail.com", status: "valid", score: 95 },
  { email: "test@tempmail.com", status: "risky", reason: "Временный email", score: 45 },
  { email: "invalid@domain", status: "invalid", reason: "Неверный формат", score: 0 },
  { email: "bounce@oldcompany.com", status: "invalid", reason: "Домен не существует", score: 0 },
  { email: "real@company.ru", status: "valid", score: 98 },
];

export default function EmailValidation() {
  const [emails, setEmails] = useState("");
  const [validating, setValidating] = useState(false);
  const [results, setResults] = useState<ValidationResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleValidate = () => {
    setValidating(true);
    setTimeout(() => {
      setResults(mockResults);
      setShowResults(true);
      setValidating(false);
      toast({
        title: "Валидация завершена",
        description: `Проверено ${mockResults.length} email адресов`,
      });
    }, 2000);
  };

  const getStatusBadge = (status: ValidationResult["status"]) => {
    switch (status) {
      case "valid":
        return (
          <Badge className="bg-gradient-green text-white border-0">
            <CheckCircle className="h-3 w-3 mr-1" />
            Валидный
          </Badge>
        );
      case "invalid":
        return (
          <Badge className="bg-gradient-red text-white border-0">
            <XCircle className="h-3 w-3 mr-1" />
            Невалидный
          </Badge>
        );
      case "risky":
        return (
          <Badge className="bg-gradient-yellow text-white border-0">
            <AlertCircle className="h-3 w-3 mr-1" />
            Рискованный
          </Badge>
        );
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  const getStats = () => {
    const valid = results.filter(r => r.status === "valid").length;
    const invalid = results.filter(r => r.status === "invalid").length;
    const risky = results.filter(r => r.status === "risky").length;
    
    return { valid, invalid, risky, total: results.length };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Валидация Email</h1>
          <p className="text-muted-foreground">
            Проверка валидности email адресов и защита от спама
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Импорт CSV
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Проверка Email адресов
              </CardTitle>
              <CardDescription>
                Введите email адреса для проверки (по одному на строку)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="example@email.com&#10;another@domain.com&#10;test@company.ru"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {emails.split('\n').filter(e => e.trim()).length} адресов для проверки
                </div>
                <Button 
                  onClick={handleValidate}
                  disabled={!emails.trim() || validating}
                  variant="gradient"
                >
                  {validating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Проверка...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Проверить
                    </>
                  )}
                </Button>
              </div>

              {showResults && (
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <span>Проверка завершена</span>
                      <div className="flex gap-4 text-sm">
                        <span className="text-gradient-green">Валидных: {stats.valid}</span>
                        <span className="text-gradient-yellow">Рискованных: {stats.risky}</span>
                        <span className="text-gradient-red">Невалидных: {stats.invalid}</span>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {showResults && (
            <Card>
              <CardHeader>
                <CardTitle>Результаты валидации</CardTitle>
                <CardDescription>
                  Детальная информация по каждому адресу
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Причина</TableHead>
                      <TableHead className="text-right">Рейтинг</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono text-sm">{result.email}</TableCell>
                        <TableCell>{getStatusBadge(result.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {result.reason || "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={`font-medium ${
                            result.score >= 80 ? "text-gradient-green" :
                            result.score >= 50 ? "text-gradient-yellow" :
                            "text-gradient-red"
                          }`}>
                            {result.score}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <SpamChecker />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Статистика валидации
              </CardTitle>
              <CardDescription>
                Общая информация по проверенным адресам
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {showResults ? (
                <>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Валидные</span>
                        <span className="text-sm font-medium text-gradient-green">
                          {stats.valid} ({((stats.valid / stats.total) * 100).toFixed(1)}%)
                        </span>
                      </div>
                      <Progress 
                        value={(stats.valid / stats.total) * 100} 
                        className="h-2"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Рискованные</span>
                        <span className="text-sm font-medium text-gradient-yellow">
                          {stats.risky} ({((stats.risky / stats.total) * 100).toFixed(1)}%)
                        </span>
                      </div>
                      <Progress 
                        value={(stats.risky / stats.total) * 100} 
                        className="h-2"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Невалидные</span>
                        <span className="text-sm font-medium text-gradient-red">
                          {stats.invalid} ({((stats.invalid / stats.total) * 100).toFixed(1)}%)
                        </span>
                      </div>
                      <Progress 
                        value={(stats.invalid / stats.total) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Общий рейтинг базы:</span>
                      <span className="text-2xl font-bold text-gradient-green">
                        {((stats.valid / stats.total) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Введите email адреса для проверки
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}