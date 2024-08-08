"use-client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  CreateCategorySchema,
  CreateCategorySchemaType,
} from "@/schema/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusSquareIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  type: TransactionType;
}

function CreateCategoryDialog({ type }: Props) {
  const [open, setOpen] = React.useState(false);
  const form = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      type,
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex border-separate items-center justify-start rounded-none border-b px-3 py-3 text-muted-foreground"
        >
          <PlusSquareIcon className="mr-2 h-4 w-4">Create new</PlusSquareIcon>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create
            <span
              className={cn(
                "m-1",
                type === "income" ? "text-emerald-500" : "text-red-500"
              )}
            >
              {type}
            </span>
            category
          </DialogTitle>
          <DialogDescription>
            Categories are used to group your transactions
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input defaultValue={""} {...field}></Input>
                  </FormControl>
                  <FormDescription>
                    Transaction description (optional)
                  </FormDescription>
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCategoryDialog;
