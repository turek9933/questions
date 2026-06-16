"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { resetWeights } from "@/lib/actions/questions";
import { deleteSession } from "@/lib/actions/sessions";

interface Props {
  sessionId: string;
  sessionName: string;
}

export function SettingsView({ sessionId, sessionName }: Props) {
  const router = useRouter();

  const handleReset = async () => {
    await resetWeights(sessionId);
  };

  const handleDelete = async () => {
    await deleteSession(sessionId);
    router.push("/");
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Reset wag</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Przywróć wszystkim pytaniom wagę 1.0. Po resecie każde pytanie będzie
            miało takie samo prawdopodobieństwo wylosowania.
          </p>
          <Dialog>
            <DialogTrigger render={<Button variant="secondary" />}>
              Resetuj wagi
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Resetować wagi?</DialogTitle>
                <DialogDescription>
                  Wszystkie wagi pytań zostaną ustawione na 1.0. Historia
                  odpowiedzi pozostanie bez zmian.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="secondary" onClick={handleReset}>
                  Resetuj
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-destructive">
            Strefa niebezpieczna
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Usuń sesję &quot;{sessionName}&quot; wraz ze wszystkimi danymi. Tej
            operacji nie można cofnąć.
          </p>
          <Dialog>
            <DialogTrigger render={<Button variant="destructive" />}>
              Usuń sesję
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Usunąć sesję?</DialogTitle>
                <DialogDescription>
                  Spowoduje to trwałe usunięcie wszystkich danych sesji &quot;
                  {sessionName}&quot;.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="destructive" onClick={handleDelete}>
                  Usuń trwale
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
