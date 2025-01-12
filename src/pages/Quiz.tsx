import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface QuizSelections {
  skinType: string[];
  concerns: string[];
  preferences: string[];
}

const Quiz = () => {
  const { toast } = useToast();
  const [selections, setSelections] = useState<QuizSelections>({
    skinType: [],
    concerns: [],
    preferences: [],
  });
  const [showResults, setShowResults] = useState(false);
  const [currentTab, setCurrentTab] = useState("type");

  const handleSelection = (category: keyof QuizSelections, item: string) => {
    setSelections(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(i => i !== item)
        : [...prev[category], item]
    }));
  };

  const getRecommendations = () => {
    if (!selections.skinType.length || !selections.concerns.length) {
      toast({
        title: "Please complete the quiz",
        description: "Make sure to select at least one skin type and concern.",
        variant: "destructive",
      });
      return;
    }

    // Simple recommendation logic based on selections
    let recommendations = [];
    
    if (selections.skinType.includes("Dry")) {
      recommendations.push({
        name: "Hydrating Face Cream",
        brand: "Natural Beauty",
        price: "$29.99",
        description: "Rich moisturizer with natural ingredients for dry skin",
      });
    }

    if (selections.concerns.includes("Sensitive")) {
      recommendations.push({
        name: "Gentle Cleansing Balm",
        brand: "Pure Skin Co",
        price: "$24.99",
        description: "A gentle, vegan cleansing balm perfect for sensitive skin",
      });
    }

    if (selections.concerns.includes("Redness")) {
      recommendations.push({
        name: "Soothing Serum",
        brand: "Eco Glow",
        price: "$34.99",
        description: "Calming serum with plant extracts for sensitive skin",
      });
    }

    setShowResults(true);
    toast({
      title: "Quiz completed!",
      description: "Here are your personalized recommendations.",
    });
  };

  const isSelected = (category: keyof QuizSelections, item: string) => 
    selections[category].includes(item);

  return (
    <div className="min-h-screen bg-mai-cream">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-mai-brown mb-4">Skin Quiz</h1>
          <p className="text-gray-600">Let's find the perfect products for your skin</p>
        </motion.div>
        
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-mai-brown">Tell us about your skin</CardTitle>
          </CardHeader>
          <CardContent>
            {!showResults ? (
              <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                <TabsList className="w-full mb-8">
                  <TabsTrigger value="type" className="flex-1">Skin Type</TabsTrigger>
                  <TabsTrigger value="concerns" className="flex-1">Skin Concerns</TabsTrigger>
                  <TabsTrigger value="preferences" className="flex-1">Preferences</TabsTrigger>
                </TabsList>
                
                <TabsContent value="type" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["Dry", "Oily", "Combination", "Normal", "Sensitive"].map((type) => (
                      <Button
                        key={type}
                        variant={isSelected("skinType", type) ? "default" : "outline"}
                        className={`h-auto p-4 text-left justify-start ${
                          isSelected("skinType", type) 
                            ? "bg-mai-coral text-white hover:bg-mai-coral/90" 
                            : "hover:bg-mai-rose/20"
                        }`}
                        onClick={() => handleSelection("skinType", type)}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="concerns" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["Acne", "Redness", "Dark spots", "Fine lines", "Uneven texture"].map((concern) => (
                      <Button
                        key={concern}
                        variant={isSelected("concerns", concern) ? "default" : "outline"}
                        className={`h-auto p-4 text-left justify-start ${
                          isSelected("concerns", concern) 
                            ? "bg-mai-coral text-white hover:bg-mai-coral/90" 
                            : "hover:bg-mai-rose/20"
                        }`}
                        onClick={() => handleSelection("concerns", concern)}
                      >
                        {concern}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="preferences" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["Fragrance-free", "Oil-free", "Non-comedogenic", "Natural ingredients", "Cruelty-free"].map((pref) => (
                      <Button
                        key={pref}
                        variant={isSelected("preferences", pref) ? "default" : "outline"}
                        className={`h-auto p-4 text-left justify-start ${
                          isSelected("preferences", pref) 
                            ? "bg-mai-coral text-white hover:bg-mai-coral/90" 
                            : "hover:bg-mai-rose/20"
                        }`}
                        onClick={() => handleSelection("preferences", pref)}
                      >
                        {pref}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-mai-brown mb-4">Your Recommended Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendations.map((product, index) => (
                    <motion.div
                      key={product.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-6 rounded-lg shadow-sm"
                    >
                      <h4 className="text-lg font-semibold text-mai-brown">{product.name}</h4>
                      <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                      <p className="text-mai-coral font-semibold mb-2">{product.price}</p>
                      <p className="text-gray-600 text-sm">{product.description}</p>
                    </motion.div>
                  ))}
                </div>
                <Button 
                  onClick={() => {
                    setShowResults(false);
                    setSelections({
                      skinType: [],
                      concerns: [],
                      preferences: [],
                    });
                  }}
                  className="mt-6 bg-mai-coral hover:bg-mai-brown text-white transition-colors"
                >
                  Retake Quiz
                </Button>
              </motion.div>
            )}
            
            {!showResults && (
              <div className="mt-8 flex justify-end">
                <Button 
                  onClick={getRecommendations}
                  className="bg-mai-coral hover:bg-mai-brown text-white transition-colors"
                >
                  Get Recommendations
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;