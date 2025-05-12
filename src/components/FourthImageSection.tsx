import { 
  Card, 
  CardContent 
} from "@/components/ui/card";

export default function FourthImageSection() {
  const faqs = [
    {
      question: "How do I get started with Orielix?",
      answer: "Sign up for an account, complete your profile, and you'll be guided through our onboarding process."
    },
    {
      question: "Are the courses self-paced?",
      answer: "Yes, all learning resources are designed to be completed at your own pace."
    },
    {
      question: "How can I connect with other learners?",
      answer: "Join our community forums, participate in group projects, and attend our virtual meetups."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, Orielix is available on iOS and Android devices for learning on the go."
    },
    {
      question: "What kind of support is available?",
      answer: "We offer 24/7 technical support, peer mentoring, and expert coaching sessions."
    }
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Hear what our Community says!
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="md:w-1/3">
            <Card className="h-full">
              <CardContent className="p-6">
                <p className="text-lg italic mb-4">
                  "Orielix transformed how I approach learning. The community is incredibly supportive!"
                </p>
                <div className="font-bold">Sarah K.</div>
                <div className="text-sm text-gray-600">Web Developer</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:w-1/3">
            <Card className="h-full shadow-lg border-indigo-200 border-2">
              <CardContent className="p-6">
                <p className="text-lg italic mb-4">
                  "The project-based learning approach helped me build a portfolio while learning new skills."
                </p>
                <div className="font-bold">Michael T.</div>
                <div className="text-sm text-gray-600">UX Designer</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:w-1/3">
            <Card className="h-full">
              <CardContent className="p-6">
                <p className="text-lg italic mb-4">
                  "I've made valuable connections through Orielix that led to amazing job opportunities."
                </p>
                <div className="font-bold">Jamie L.</div>
                <div className="text-sm text-gray-600">Data Scientist</div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-6 text-center">FAQs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {faqs.slice(0, 3).map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <h4 className="text-lg font-bold mb-2">{index + 1}. {faq.question}</h4>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="space-y-6">
            {faqs.slice(3).map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <h4 className="text-lg font-bold mb-2">{index + 4}. {faq.question}</h4>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t text-center">
          <p className="text-xl font-semibold mb-2">Ready to get started?</p>
          <p className="text-gray-600 mb-0">Join thousands of learners transforming their futures with Orielix</p>
        </div>
      </div>
    </section>
  );
}
