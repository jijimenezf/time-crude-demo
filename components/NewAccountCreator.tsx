"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createAccount } from "@/lib/actions";
import { useState } from "react";

export default function NewAccountCreator() {
  const [editMode, setEditMode] = useState(false);

  if (!editMode) {
    return (
      <button className="text-left" onClick={() => setEditMode(true)}>
        + New Account
      </button>
    );
  }

  return (
    <form
      action={createAccount}
      onSubmit={() => setEditMode(false)}
      className="flex flex-wrap gap-1"
    >
      <Input
        type="text"
        name="name"
        placeholder="Account Name"
        className="text-slate-900"
      />
      <Button type="submit">Create</Button>
      <Button onClick={() => setEditMode(false)}>Cancel</Button>
    </form>
  );
}
