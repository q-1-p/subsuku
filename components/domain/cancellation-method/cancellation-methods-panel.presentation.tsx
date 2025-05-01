"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import {} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {} from "@/components/ui/tooltip";
import type { ICancellationMethod } from "@/domain/cancellation-method/cancellation-method";
import CancellationMethodCard from "./cancellation-method-card";

export default function CancellationMethodsPanelPresentation({
  cancellationMethods,
}: { cancellationMethods: ICancellationMethod[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Card className="overflow-hidden rounded-2xl border shadow-sm">
        <CardHeader>
          <CardTitle>解約方法一覧</CardTitle>
          <CardDescription>各サービスの解約手順を確認できます</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <div className="relative w-full">
                  <Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="サービスを検索..."
                    className="rounded-xl pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" className="rounded-xl">
                    いいね順
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cancellationMethods.length > 0 ? (
                cancellationMethods.map((cancellationMethod) => (
                  <CancellationMethodCard
                    key={cancellationMethod.id}
                    cancellationMethod={cancellationMethod}
                  />
                ))
              ) : (
                <div className="col-span-full flex h-24 items-center justify-center">
                  <p className="text-muted-foreground">
                    該当するサービスはありません
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
