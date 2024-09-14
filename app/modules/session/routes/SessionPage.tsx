import { cn } from "~/lib/utils";

import { Card } from "../components/Card";
import { useSessionStore } from "../stores/session.store";
import { Button } from "~/components/ui/button";
import { cards } from "../constants";
import { ResultForm } from "../components/ResultForm";

export const SessionPage = ({ id }: { id: string }) => {
  const {
    activeCard,
    isRevealed,
    players,
    averagePoint,
    actions: { setActiveCard, setIsRevealed },
  } = useSessionStore();

  return (
    <div className="w-full">
      <header
        title="page-header"
        className={cn([
          "w-full p-4",
          "bg-white shadow-md",
          "flex items-center justify-between",
        ])}
      >
        <div>Session: {id}</div>
        <div>
          <Button>Copy Link</Button>
        </div>
      </header>
      <div title="page-body" className="w-full h-full mt-4">
        <div className="flex gap-2 justify-center">
          {!isRevealed ? (
            <Button onClick={() => setIsRevealed(true)}>Reveal</Button>
          ) : (
            <ResultForm
              averagePoint={averagePoint}
              onReset={() => {
                setIsRevealed(false);
                setActiveCard(null);
              }}
            ></ResultForm>
          )}
        </div>
        <div
          className={cn([
            "fixed inset-0",
            "flex items-center justify-center",
            "pointer-events-none",
          ])}
        >
          <div className={cn(["flex gap-2 justify-center", "py-4"])}>
            {players.map((player) => (
              <Card
                key={player.id}
                isFlipped={isRevealed}
                content={player.currentCardContent}
              ></Card>
            ))}
          </div>
          {!isRevealed && (
            <div
              className={cn([
                "w-full flex gap-2 justify-center",
                "fixed bottom-0",
                "py-4",
                "pointer-events-auto",
              ])}
            >
              {cards.map((card) => (
                <Card
                  key={card}
                  isFlipped={true}
                  isActive={activeCard === card}
                  content={card}
                  onClick={() => setActiveCard(card)}
                ></Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
