
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, AlertTriangle, HelpCircle } from "lucide-react";

export default function SecondImageSection() {
  const feelingCards = [
    {
      title: "Lost",
      description: "Struggling to find direction in your learning journey",
      icon: <HelpCircle className="h-10 w-10 text-red-500" />,
      color: "bg-red-100"
    },
    {
      title: "Distracted",
      description: "Having trouble focusing on what truly matters",
      icon: <AlertTriangle className="h-10 w-10 text-amber-500" />,
      color: "bg-amber-100"
    },
    {
      title: "Inconsistent",
      description: "Finding it hard to maintain regular learning habits",
      icon: <AlertCircle className="h-10 w-10 text-blue-500" />,
      color: "bg-blue-100"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Do you feel</h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Many learners struggle with these common challenges. Orielix is designed to help you overcome them.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {feelingCards.map((card, index) => (
            <Card key={index} className="overflow-hidden border-2">
              <CardContent className={`p-8 flex flex-col items-center text-center ${card.color}`}>
                <div className="mb-4">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                <p className="text-gray-700">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-xl font-medium mb-6">
            With Orielix, you'll never have to feel this way again
          </p>
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-6 rounded-full text-lg">
            Transform Your Learning Experience
          </Button>
        </div>
      </div>
    </section>
  );
}
