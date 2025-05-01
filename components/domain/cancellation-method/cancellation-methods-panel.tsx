"use client";

import {
  Copy,
  Edit,
  ExternalLink,
  Heart,
  Search,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// サンプルデータ
const cancellationGuides = [
  {
    id: 1,
    name: "Netflix",
    category: "エンターテイメント",
    website: "https://www.netflix.com",
    logo: "N",
    color: "bg-orange-500",
    difficulty: "easy",
    steps: [
      "Netflixのウェブサイトにログインします",
      "右上のプロフィールアイコンをクリックし、「アカウント」を選択します",
      "「メンバーシップとお支払い」セクションで「メンバーシップを解約する」をクリックします",
      "「解約を完了する」をクリックして確定します",
    ],
    notes:
      "解約後も請求期間の終了まではサービスを利用できます。解約後30日以内に再開すると、視聴履歴やプロフィールが保持されます。",
    refundPolicy:
      "日割り計算での返金はありません。請求期間の終了まで利用可能です。",
    contactInfo: "カスタマーサポート: 0120-XXX-XXX（24時間対応）",
    isOfficial: true,
    user: null,
    createdAt: null,
    likes: 42,
    comments: 5,
    verified: 18,
  },
  {
    id: 2,
    name: "Spotify",
    category: "音楽",
    website: "https://www.spotify.com",
    logo: "S",
    color: "bg-pink-500",
    difficulty: "easy",
    steps: [
      "Spotifyのウェブサイトにアクセスし、ログインします",
      "右上のプロフィールアイコンをクリックし、「アカウント」を選択します",
      "左側のメニューから「サブスクリプション」を選択します",
      "「サブスクリプションを管理」セクションで「プランを変更または解約」をクリックします",
      "「Premium を解約」を選択し、理由を選んで「次へ」をクリックします",
      "「Premium を解約」ボタンをクリックして確定します",
    ],
    notes:
      "解約後は無料プランに自動的に切り替わります。プレイリストや保存した曲は引き続き利用できますが、広告が表示されオフライン再生などの機能が制限されます。",
    refundPolicy:
      "日割り計算での返金はありません。請求期間の終了まで利用可能です。",
    contactInfo: "サポートページ: https://support.spotify.com",
    isOfficial: true,
    user: null,
    createdAt: null,
    likes: 38,
    comments: 3,
    verified: 15,
  },
  {
    id: 3,
    name: "Amazon Prime",
    category: "ショッピング",
    website: "https://www.amazon.co.jp",
    logo: "A",
    color: "bg-amber-500",
    difficulty: "medium",
    steps: [
      "Amazonのウェブサイトにログインします",
      "「アカウント＆リスト」をクリックし、「アカウントサービス」を選択します",
      "「Prime」セクションで「Prime会員情報の管理」をクリックします",
      "「会員資格を終了する」をクリックします",
      "「特典と会員資格」ページで「会員資格を終了する」をクリックします",
      "解約理由を選択し、「会員資格を終了する」をクリックして確定します",
    ],
    notes:
      "解約後も支払い済みの期間まではサービスを利用できます。年会費を支払った場合、利用期間に応じた返金が受けられる場合があります。",
    refundPolicy:
      "年会費プランの場合、未使用期間に応じて返金される場合があります。カスタマーサービスに問い合わせてください。",
    contactInfo: "カスタマーサービス: 0120-XXX-XXX",
    isOfficial: true,
    user: null,
    createdAt: null,
    likes: 29,
    comments: 7,
    verified: 12,
  },
  {
    id: 10,
    name: "Netflix",
    category: "エンターテイメント",
    website: "https://www.netflix.com",
    logo: "N",
    color: "bg-orange-500",
    difficulty: "easy",
    steps: [
      "スマートフォンのNetflixアプリを開きます",
      "右下のプロフィールアイコンをタップします",
      "「アカウント」を選択します",
      "ブラウザが開くので「メンバーシップとお支払い」セクションで「メンバーシップを解約する」をタップします",
      "「解約を完了する」をタップして確定します",
    ],
    notes:
      "アプリからの解約方法です。iPhoneアプリからは直接解約できないので、ブラウザに移動します。解約後も請求期間の終了まではサービスを利用できます。",
    refundPolicy:
      "日割り計算での返金はありません。請求期間の終了まで利用可能です。",
    contactInfo: "カスタマーサポート: 0120-XXX-XXX（24時間対応）",
    isOfficial: false,
    user: {
      name: "田中太郎",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "2024-04-10T12:30:00",
    likes: 8,
    comments: 2,
    verified: 3,
  },
  {
    id: 11,
    name: "Amazon Prime",
    category: "ショッピング",
    website: "https://www.amazon.co.jp",
    logo: "A",
    color: "bg-amber-500",
    difficulty: "easy",
    steps: [
      "Amazonアプリを開きます",
      "右下のメニューから「アカウント」をタップします",
      "「アカウントサービス」をタップします",
      "「Prime会員情報の管理」をタップします",
      "「会員資格を終了する」をタップします",
      "解約理由を選択し、「会員資格を終了する」をタップして確定します",
    ],
    notes:
      "アプリからの解約方法です。PCよりも簡単に解約できます。解約後も支払い済みの期間まではサービスを利用できます。",
    refundPolicy:
      "年会費プランの場合、未使用期間に応じて返金される場合があります。カスタマーサービスに問い合わせてください。",
    contactInfo: "カスタマーサービス: 0120-XXX-XXX",
    isOfficial: false,
    user: {
      name: "佐藤花子",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "2024-04-08T15:45:00",
    likes: 12,
    comments: 1,
    verified: 5,
  },
];

// マイ解約ガイドデータをインポート
const myPrivateCancellationGuides = [
  {
    id: 20,
    name: "FODプレミアム",
    category: "エンターテイメント",
    website: "https://fod.fujitv.co.jp/",
    logo: "F",
    color: "bg-blue-500",
    difficulty: "medium",
    steps: [
      "FODのウェブサイトにログインします",
      "メニューから「月額コースの確認・解約」を選択します",
      "「解約する」ボタンをクリックします",
      "確認画面で「解約する」をクリックして確定します",
    ],
    notes: "解約すると、すぐにFODプレミアムの特典が利用できなくなります。",
    refundPolicy: "日割り計算での返金はありません。",
    contactInfo: "FODカスタマーサポート",
    user: {
      name: "山田太郎",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "2024-04-15T09:00:00",
    likes: 3,
    comments: 0,
    verified: 1,
  },
];

export default function CancellationMethodsPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, _setSelectedCategory] = useState("すべて");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // すべてのガイドをマージ（表示用）
  const allGuides = [
    ...cancellationGuides,
    ...myPrivateCancellationGuides.filter(
      (myGuide) =>
        !cancellationGuides.some((guide) => guide.name === myGuide.name),
    ),
  ];

  // 検索、フィルタリング、ソート処理
  const filteredGuides = allGuides
    .filter((guide) => {
      // 検索フィルタリング
      const matchesSearch = guide.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // カテゴリフィルタリング
      const matchesCategory =
        selectedCategory === "すべて" || guide.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // ソート処理
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortBy === "difficulty") {
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        return sortOrder === "asc"
          ? difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
          : difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
      }
      if (sortBy === "likes") {
        return sortOrder === "asc" ? a.likes - b.likes : b.likes - a.likes;
      }
      if (sortBy === "verified") {
        return sortOrder === "asc"
          ? a.verified - b.verified
          : b.verified - a.verified;
      }
      return 0;
    });

  // ソート順を切り替える関数
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // 解約手順をクリップボードにコピーする関数
  const copyStepsToClipboard = (guide) => {
    const stepsText = guide.steps
      .map((step, index) => `${index + 1}. ${step}`)
      .join("\n");
    const fullText = `${guide.name}の解約手順:\n\n${stepsText}\n\n注意事項:\n${guide.notes}\n\n公式サイト: ${guide.website}`;

    navigator.clipboard.writeText(fullText).then(() => {
      toast("コピーしました", {
        description: `${guide.name}の解約手順をクリップボードにコピーしました。`,
      });
    });
  };

  // いいねを押す関数
  const handleLike = (_guideId: number) => {
    toast("いいねしました", {
      description: "この解約方法が役に立ったことを評価しました。",
    });
  };

  // 検証する関数
  const handleVerify = (_guideId: number) => {
    toast("検証しました", {
      description:
        "この解約方法で解約できたことを報告しました。ありがとうございます！",
    });
  };

  return (
    <>
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
                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => {
                      setSortBy("likes");
                      toggleSortOrder();
                    }}
                  >
                    いいね順{" "}
                    {sortBy === "likes" && (sortOrder === "asc" ? "↑" : "↓")}
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredGuides.length > 0 ? (
                filteredGuides.map((guide) => (
                  <Card
                    key={guide.id}
                    className="gap-2 overflow-hidden rounded-2xl border shadow-sm transition-shadow duration-200 hover:shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${guide.color} font-bold text-lg text-white`}
                          >
                            {guide.logo}
                          </div>
                          <div>
                            <CardTitle className="text-xl">
                              {guide.name}
                            </CardTitle>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="steps" className="border-none">
                          <AccordionTrigger className="py-2 hover:no-underline">
                            <span className="font-medium text-sm">
                              解約手順
                            </span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ol className="list-decimal space-y-2 pl-5 text-sm">
                              {guide.steps.map((step, index) => (
                                <li
                                  key={index.toString()}
                                  className="text-muted-foreground"
                                >
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="notes" className="border-none">
                          <AccordionTrigger className="py-2 hover:no-underline">
                            <span className="font-medium text-sm">
                              注意事項
                            </span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground text-sm">
                              {guide.notes}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="refund" className="border-none">
                          <AccordionTrigger className="py-2 hover:no-underline">
                            <span className="font-medium text-sm">その他</span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground text-sm">
                              {guide.refundPolicy}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                      <div className="flex w-full justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl"
                          onClick={() => copyStepsToClipboard(guide)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          手順をコピー
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl"
                          asChild
                        >
                          <a
                            href={guide.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            公式サイト
                          </a>
                        </Button>
                      </div>
                      <div className="mt-1 flex w-full items-center justify-between">
                        <div className="flex items-center gap-3">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2"
                                  onClick={() => handleLike(guide.id)}
                                >
                                  <Heart className="mr-1 h-4 w-4" />
                                  <span className="text-xs">{guide.likes}</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>役に立った</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2"
                                  onClick={() => handleVerify(guide.id)}
                                >
                                  <ThumbsUp className="mr-1 h-4 w-4" />
                                  <span className="text-xs">
                                    {guide.verified}
                                  </span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>この方法で解約できました</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <div className="mt-1 flex w-full justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl"
                          asChild
                        >
                          <Link href={`/cancellation-guide/edit/${guide.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            編集
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          削除
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
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
    </>
  );
}
