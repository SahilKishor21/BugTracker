"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { TaskForm } from "@/components/tasks/task-form";

export default function NewTaskPage() {
  return (
    <AuthGuard>
      <div className=" bg-muted/50">
        <div className="main-container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Create New Task</h1>
            <p className="text-muted-foreground">
              Fill in the details below to create a new task or bug report
            </p>
          </div>

          <TaskForm />
        </div>
      </div>
    </AuthGuard>
  );
}
