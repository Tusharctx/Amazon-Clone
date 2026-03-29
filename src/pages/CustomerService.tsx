import { Link } from "react-router-dom";
import { Search, ChevronRight, Phone, Mail, MessageSquare, Clock, ShoppingCart, Package, Shield, CreditCard, Headphones } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CustomerService = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const helpTopics = [
    {
      icon: ShoppingCart,
      title: "Orders & Purchases",
      description: "Track your order, returns, refunds, and payment issues",
      links: ["Track Your Order", "Return or Replace Items", "Refund Status", "Payment Methods"],
    },
    {
      icon: Package,
      title: "Shipping & Delivery",
      description: "Fast shipping options and delivery information",
      links: ["Shipping Rates & Policies", "Delivery Protection", "Address Changes", "Amazon Prime Shipping"],
    },
    {
      icon: Shield,
      title: "Account & Login",
      description: "Manage your account and login security",
      links: ["Reset Password", "Update Account Info", "Two-Factor Authentication", "Email & Notifications"],
    },
    {
      icon: Shield,
      title: "Product Safety & Recalls",
      description: "Safety information and product recalls",
      links: ["Product Safety", "Recall Information", "Dangerous Goods", "Copyright & Trademark"],
    },
    {
      icon: CreditCard,
      title: "Digital Services",
      description: "Help with Prime, Kindle, Apps, and subscriptions",
      links: ["Amazon Prime Membership", "Kindle Support", "Apps & Downloads", "Subscriptions"],
    },
    {
      icon: Headphones,
      title: "Browse Help Topics",
      description: "Find answers to common questions",
      links: ["All Topics A-Z", "Frequently Asked Questions", "Documentation", "Video Tutorials"],
    },
  ];

  const contactChannels = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with a customer service representative",
      action: "1-800-123-4567",
      available: "Available 24/7",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a message and we'll respond within 24 hours",
      action: "support@amazon.in",
      available: "Response within 24 hours",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with a representative in real-time",
      action: "Start a Conversation",
      available: "9 AM - 9 PM IST",
    },
    {
      icon: Clock,
      title: "Callback Request",
      description: "We'll call you back at your preferred time",
      action: "Request a Callback",
      available: "Schedule a time",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-[1500px] mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Service</h1>
            <p className="text-gray-600">We're here to help. Find answers to your questions.</p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 text-base"
              />
            </div>
            <Button className="bg-amazon-orange hover:bg-amazon-orange/80 text-amazon-navy px-6 font-bold">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1500px] mx-auto px-4 py-8">
        {/* Contact Methods */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <div
                  key={channel.title}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <Icon className="w-8 h-8 text-amazon-orange mb-3" />
                  <h3 className="font-bold text-gray-900 mb-1">{channel.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{channel.description}</p>
                  <p className="text-amazon-orange font-semibold text-sm mb-2">{channel.action}</p>
                  <p className="text-xs text-gray-500">{channel.available}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Help Topics */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Help Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {helpTopics.map((topic, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-lg text-gray-900 mb-2">{topic.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{topic.description}</p>
                <div className="space-y-2">
                  {topic.links.map((link) => (
                    <button
                      key={link}
                      className="w-full text-left text-amazon-orange hover:underline text-sm font-medium flex items-center justify-between group"
                    >
                      <span>{link}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amazon-orange transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Track Your Order",
                "Returns & Refunds",
                "Shipping Information",
                "Account Settings",
                "Payment Methods",
                "Prime Membership",
                "Safety & Security",
                "Report a Problem",
              ].map((link) => (
                <Link
                  key={link}
                  to="#"
                  className="text-amazon-orange hover:underline text-sm font-medium"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              "How do I track my order?",
              "What is Amazon Prime and how do I join?",
              "How can I return or exchange an item?",
              "What is your refund policy?",
              "How can I update my address?",
              "What payment methods do you accept?",
            ].map((faq) => (
              <button
                key={faq}
                className="w-full bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left flex items-center justify-between group"
              >
                <span className="font-medium text-gray-900 group-hover:text-amazon-orange transition-colors">
                  {faq}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-amazon-orange transition-colors" />
              </button>
            ))}
          </div>
        </section>

        {/* Chat Support */}
        <section className="mt-12 bg-gradient-to-r from-amazon-navy to-[#0d1117] rounded-lg p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <MessageSquare className="w-8 h-8 text-amazon-orange" />
            <h2 className="text-2xl font-bold">Need immediate help?</h2>
          </div>
          <p className="text-gray-300 mb-6">
            Chat with our customer service team now. We're available to help 24/7.
          </p>
          <Button className="bg-amazon-orange hover:bg-amazon-orange/80 text-amazon-navy font-bold px-8">
            Start Live Chat
          </Button>
        </section>
      </div>
    </div>
  );
};

export default CustomerService;
