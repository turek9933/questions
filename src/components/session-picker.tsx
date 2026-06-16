"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getSessions, createSession, deleteSession } from "@/lib/actions/sessions";
import type { Session } from "@/lib/types";

export function SessionPicker() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    getSessions().then((data) => {
      setSessions(data);
      setLoading(false);
    });
  }, []);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      await createSession(newName.trim());
      setNewName("");
      const updated = await getSessions();
      setSessions(updated);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteSession(id);
    const updated = await getSessions();
    setSessions(updated);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground">Ładowanie sesji...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Powtarzanie pytań egzaminacyjnych
      </h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Nowa sesja</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Input
            placeholder="Nazwa sesji (np. inzynierka-2026)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <Button onClick={handleCreate} disabled={creating || !newName.trim()}>
            {creating ? "Tworzenie..." : "Utwórz"}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {sessions.length === 0 && (
          <p className="text-center text-muted-foreground">
            Brak sesji. Utwórz pierwszą!
          </p>
        )}
        {sessions.map((session) => (
          <Card key={session.id} className="hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-between p-4">
              <button
                className="text-left flex-1"
                onClick={() => router.push(`/session/${session.id}`)}
              >
                <h3 className="font-semibold text-lg">{session.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Ostatnio użyta:{" "}
                  {new Date(session.last_used_at).toLocaleDateString("pl-PL")}
                </p>
              </button>
              <Dialog>
                <DialogTrigger
                  render={<Button variant="destructive" size="sm" />}
                >
                  Usuń
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Usuń sesję?</DialogTitle>
                    <DialogDescription>
                      Ta operacja usunie wszystkie dane sesji &quot;{session.name}
                      &quot;. Tej operacji nie można cofnąć.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(session.id)}
                    >
                      Usuń
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
