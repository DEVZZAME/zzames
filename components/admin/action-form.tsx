"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { AdminActionState } from "@/app/admin/actions";

type Field = {
  name: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  type?: string;
};

type ActionFormProps = {
  title: string;
  description: string;
  fields: Field[];
  submitLabel: string;
  action: (
    state: AdminActionState,
    formData: FormData,
  ) => Promise<AdminActionState>;
};

const initialState: AdminActionState = {};

export function ActionForm({ title, description, fields, submitLabel, action }: ActionFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {fields.map((field) => (
            <div className="space-y-2" key={field.name}>
              <label className="text-sm font-medium" htmlFor={field.name}>
                {field.label}
              </label>
              {field.multiline ? (
                <Textarea id={field.name} name={field.name} placeholder={field.placeholder} />
              ) : (
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  type={field.type ?? "text"}
                />
              )}
            </div>
          ))}
          {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
          {state.success ? <p className="text-sm text-emerald-600">{state.success}</p> : null}
          <Button disabled={pending} type="submit">
            {pending ? "Saving..." : submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
