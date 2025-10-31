'use client';

import { useMemo, useState, useEffect } from "react";
import Button from "@/app/DesignSystem/components/Button";
import { useCitadelProgress } from "../lib/progress";
import { concepts } from "../data/academy";
import { readBuildNote, writeBuildNote, writeResult } from "../lib/academy";

/**
 * Academy v1 (Week 5):
 * 1) choose concept (Tier 1 only for now)
 * 2) learn (short lesson)
 * 3) quiz (MCQ) — pass threshold to proceed
 * 4) build (notes link; persists locally)
 * 5) complete — unlocks corresponding Tower node
 *
 * Tailwind-first (no CSS files).
 */
type Step = "choose" | "learn" | "quiz" | "build" | "done";

export default function Academy() {
  const { isUnlocked, toggleNode } = useCitadelProgress();
  const t1Concepts = useMemo(() => concepts, []);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const sel = t1Concepts.find(c => c.id === selectedId) || null;

  const [step, setStep] = useState<Step>("choose");
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [score, setScore] = useState<number | null>(null);
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    if (sel) setNote(readBuildNote(sel.id));
  }, [sel]);

  function startSelected(id: string) {
    setSelectedId(id);
    setStep("learn");
          <div className="mt-6 flex items-center gap-3">
            {step !== "choose" && step !== "done" && (
              <Button
                onClick={() => {
                  if (step === "learn") setStep("choose");
                  else if (step === "quiz") setStep("learn");
                  else if (step === "build") setStep("quiz");
                }}
                className="opacity-75"
              >
                Back
              </Button>
            )}

            {step !== "done" && (
              <Button
                onClick={() => {
                  if (!sel) return;
                  if (step === "learn") setStep("quiz");
                  else if (step === "quiz") {
                    if (score === null) return;
                    if (score >= passNeeded) setStep("build");
                  }
                  else if (step === "build") {
                    writeResult({
                      conceptId: sel.id,
                      score: score || 0,
                      total: sel.quiz.length,
                      notes: note,
                      completedAt: Date.now()
                    });
                    if (!isUnlocked(sel.nodeId)) {
                      toggleNode(sel.nodeId, true);
                    }
                    setStep("done");
                  }
                }}
                disabled={!canContinue}
              >
                {step === "learn" ? "Next" : step === "quiz" ? "Continue" : step === "build" ? "Finish" : "Continue"}
              </Button>
            )}
            >
              <div className="text-xs text-gray-500">{c.trackTitle} · Tier 1</div>
              <div className="mt-1 font-medium">{c.title}</div>
              {isUnlocked(c.nodeId) && <div className="mt-2 text-xs text-green-600">Unlocked</div>}
            </button>
          ))}
        </div>
      )}

      {sel && step !== "choose" && (
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500">{sel.trackTitle} · Tier 1</div>
              <h3 className="text-lg font-semibold">{sel.title}</h3>
            </div>
            <div className="text-xs text-gray-500">Step: {step}</div>
          </div>

          {step === "learn" && (
            <div className="mt-4 space-y-4">
              <p className="text-sm leading-relaxed">{sel.lesson}</p>
              <div className="text-xs text-gray-500">Tip: keep it short and focused; you’ll reinforce by building.</div>
              <div className="mt-4">
                <Button onClick={() => setStep("quiz")}>Start quiz</Button>
              </div>
            </div>
          )}

          {step === "quiz" && (
            <div className="mt-4 space-y-4">
              {sel.quiz.map((q, i) => (
                <div key={i} className="rounded-md border border-gray-200 p-3">
                  <div className="text-sm font-medium">{i + 1}. {q.q}</div>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {q.choices.map((choice, idx) => {
                      const selected = answers[i] === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setAnswers(a => ({ ...a, [i]: idx }))}
                          className={`rounded border px-3 py-2 text-left text-sm transition ${selected ? "border-gray-900 shadow-sm" : "border-gray-200 hover:border-gray-300"}`}
                        >
                          {choice}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-3">
                <Button onClick={() => grade()}>
                  Grade quiz
                </Button>
                {score !== null && sel && (
                  <div className="text-sm">
                    Score: <span className={score >= passNeeded ? "text-green-600" : "text-red-600"}>{score}/{sel.quiz.length}</span> (pass ≥ {passNeeded})
                  </div>
                )}
              </div>
            </div>
          )}

          {step === "build" && (
            <div className="mt-4 space-y-3">
              <p className="text-sm text-gray-700">
                Jot a tiny build plan or notes (e.g., “replace non-semantic wrappers with proper tags in Intro page”).
                This is a placeholder for Week 6 auto-embed into Labs.
              </p>
              <textarea
                className="w-full rounded-md border border-gray-300 p-3 text-sm focus:outline-none focus:ring focus:ring-gray-300"
                rows={5}
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                  writeBuildNote(sel.id, e.target.value);
                }}
                placeholder="Your build notes / link (optional)…"
              />
              <div className="text-xs text-gray-500">Saved locally; private by default.</div>
            </div>
          )}

          {step === "done" && (
            <div className="mt-4 space-y-2">
              <div className="text-green-700">Nice — this node is unlocked in your Tower.</div>
              <div className="text-xs text-gray-500">You can retake later to improve your score.</div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            {step !== "choose" && step !== "done" && (
              <Button
                onClick={() => {
                  if (step == "learn") setStep("choose");
                  else if (step === "quiz") setStep("learn");
                  else if (step === "build") setStep("quiz");
                }}
                className="opacity-75"
              >
                Back
              </Button>
            )}

            {step !== "done" && (
              <Button
                onClick={() => {
                  if (!sel) return;
                  if (step == "learn") setStep("quiz");
                  else if (step === "quiz") {
                    if (score === null) return;
                    if (score >= passNeeded) setStep("build");
                  else if (step === "build") {
                    writeResult({
                      conceptId: sel.id,
                      score: score || 0,
                      total: sel.quiz.length,
                      notes: note,
                      completedAt: Date.now()
                    });
                    if (!isUnlocked(sel.nodeId)) {
                      toggleNode(sel.nodeId, true);
                    }
                    setStep("done");
                }}
                disabled={!canContinue}
              >
                {step === "learn" ? "Next" : step === "quiz" ? "Continue" : step === "build" ? "Finish" : "Continue"}
              </Button>
            )}

            {step === "done" && (
              <Button onClick={() => setStep("choose")}>Choose another</Button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
