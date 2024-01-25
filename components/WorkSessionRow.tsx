"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { deleteWorkSession } from "@/lib/actions";
import WorkSessionFormRow from "./WorkSessionFormRow";
import Modal from "react-modal";

type Props = {
  session: {
    id: string;
    accountId: string;
    description: string | null;
    startsOn: Date | null;
    hours: number | null;
  };
};

export default function WorkSessionRow({ session }: Props) {
  const [editMode, setEditMode] = useState(false);

  function closeModal() {
    setEditMode(false);
  }

  if (editMode) {
    return (
      <div>
        <Modal isOpen={editMode} contentLabel="Edit your Work Session">
          <WorkSessionFormRow
            account={{ id: session.accountId }}
            session={session}
            onCancelClick={() => setEditMode(false)}
          />
        </Modal>
      </div>
    );
  }

  return (
    <div className="flex flex-1 text-right">
      <Button
        variant="ghost"
        size="sm"
        className="text-slate-500"
        onClick={() => setEditMode(true)}
      >
        <PencilIcon size={16} />
      </Button>
      <form action={deleteWorkSession}>
        <input type="hidden" name="id" value={session.id} />
        <Button variant="ghost" size="sm" className="text-slate-500">
          <TrashIcon size={16} />
        </Button>
      </form>
    </div>
  );
}
