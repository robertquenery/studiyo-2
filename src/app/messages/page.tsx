"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, MessageCircle, Phone, Video, MoreVertical, Send, Paperclip, User, Users, Check, CheckCheck } from "lucide-react";

type Contact = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "online" | "offline";
  isBot: boolean;
  lastMessage: string;
  time: string;
  unread?: number;
};

type Message = {
  id: string;
  sender: string;
  content: string;
  time: string;
  isMe: boolean;
  status: "sent" | "delivered" | "read";
};

const chatRooms: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      sender: "Curtis Chang",
      content: "Hello! I've updated the risk assessment framework for your project.",
      time: "10:30 AM",
      isMe: false,
      status: "read"
    },
    {
      id: "2",
      sender: "Me",
      content: "Thank you! I'll review the new framework right away.",
      time: "10:31 AM",
      isMe: true,
      status: "read"
    },
    {
      id: "3",
      sender: "Curtis Chang",
      content: "Let me know if you have any questions about the risk mitigation strategies.",
      time: "10:32 AM",
      isMe: false,
      status: "read"
    }
  ],
  "2": [
    {
      id: "1",
      sender: "Moataz El-Menshawy",
      content: "Please review the lean principles we covered in class.",
      time: "Yesterday",
      isMe: false,
      status: "read"
    },
    {
      id: "2",
      sender: "Me",
      content: "I'll go through the process mapping exercises tonight.",
      time: "Yesterday",
      isMe: true,
      status: "read"
    }
  ],
  "3": [
    {
      id: "1",
      sender: "Gabriella Marques",
      content: "Your leadership style analysis was excellent work.",
      time: "Yesterday",
      isMe: false,
      status: "read"
    },
    {
      id: "2",
      sender: "Me",
      content: "Thank you for the feedback!",
      time: "Yesterday",
      isMe: true,
      status: "read"
    }
  ],
  "4": [
    {
      id: "1",
      sender: "Charles Chen",
      content: "Don't forget our sprint planning session tomorrow.",
      time: "2:45 PM",
      isMe: false,
      status: "read"
    },
    {
      id: "2",
      sender: "Me",
      content: "I'll have my backlog ready for review.",
      time: "2:46 PM",
      isMe: true,
      status: "read"
    }
  ],
  "5": [
    {
      id: "1",
      sender: "Kristin Matheson",
      content: "Your market analysis presentation was very insightful.",
      time: "3:15 PM",
      isMe: false,
      status: "read"
    },
    {
      id: "2",
      sender: "Me",
      content: "I'm glad the research was helpful!",
      time: "3:16 PM",
      isMe: true,
      status: "read"
    }
  ],
  "6": [
    {
      id: "1",
      sender: "Jasmin Bartolome",
      content: "Anyone free for a study session tonight? Working on the risk assessment project.",
      time: "4:20 PM",
      isMe: false,
      status: "read"
    },
    {
      id: "2",
      sender: "Arvin Garcia",
      content: "I'm in! Need help with the process mapping too.",
      time: "4:22 PM",
      isMe: false,
      status: "read"
    },
    {
      id: "3",
      sender: "Me",
      content: "Count me in. Library at 7pm?",
      time: "4:25 PM",
      isMe: true,
      status: "read"
    },
    {
      id: "4",
      sender: "Jashanpreet Kaur",
      content: "Perfect timing! I just finished the first part of the risk analysis.",
      time: "4:26 PM",
      isMe: false,
      status: "read"
    },
    {
      id: "5",
      sender: "Jasmin Bartolome",
      content: "I'll bring my notes from Curtis's last lecture.",
      time: "4:27 PM",
      isMe: false,
      status: "read"
    },
    {
      id: "6",
      sender: "Arvin Garcia",
      content: "Great! Let's meet at the second floor study rooms.",
      time: "4:28 PM",
      isMe: false,
      status: "read"
    }
  ],
  "7": [
    {
      id: "1",
      sender: "Studiyo AI",
      content: "Hello! I'm your AI study assistant. How can I help you today?",
      time: "5:00 PM",
      isMe: false,
      status: "read"
    },
    {
      id: "2",
      sender: "Me",
      content: "Can you help me understand risk mitigation strategies?",
      time: "5:01 PM",
      isMe: true,
      status: "read"
    },
    {
      id: "3",
      sender: "Studiyo AI",
      content: "Of course! Risk mitigation involves identifying, evaluating, and implementing strategies to reduce potential risks in a project. Would you like me to explain the main types of risk mitigation strategies?",
      time: "5:01 PM",
      isMe: false,
      status: "read"
    }
  ]
};

export default function MessagesPage() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Curtis Chang",
      role: "Instructor - PGMT 2001",
      avatar: "CC",
      status: "online",
      isBot: false,
      lastMessage: "Please review the risk assessment framework",
      time: "10:30 AM",
      unread: 2
    },
    {
      id: "2",
      name: "Moataz El-Menshawy",
      role: "Instructor - OPMT 1005",
      avatar: "ME",
      status: "online",
      isBot: false,
      lastMessage: "Check the updated process mapping guidelines",
      time: "Yesterday",
      unread: 1
    },
    {
      id: "3",
      name: "Gabriella Marques",
      role: "Instructor - PGMT 2003",
      avatar: "GM",
      status: "online",
      isBot: false,
      lastMessage: "Leadership assessment due next week",
      time: "Yesterday"
    },
    {
      id: "4",
      name: "Charles Chen",
      role: "Instructor - PGMT 2002",
      avatar: "CC",
      status: "online",
      isBot: false,
      lastMessage: "Sprint planning session tomorrow",
      time: "2:45 PM"
    },
    {
      id: "5",
      name: "Kristin Matheson",
      role: "Instructor - MGMT 1006",
      avatar: "KM",
      status: "online",
      isBot: false,
      lastMessage: "Marketing strategy presentation next class",
      time: "3:15 PM"
    },
    {
      id: "6",
      name: "42C Study Group",
      role: "Group Chat",
      avatar: "42",
      status: "online",
      isBot: false,
      lastMessage: "Anyone free for study session tonight?",
      time: "4:20 PM",
      unread: 3
    },
    {
      id: "7",
      name: "Studiyo AI",
      role: "AI Assistant",
      avatar: "AI",
      status: "online",
      isBot: true,
      lastMessage: "How can I help you with your studies today?",
      time: "5:00 PM"
    }
  ]);

  const [messages, setMessages] = useState<Message[]>(chatRooms[contacts[0].id]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const botResponses = {
    "Curtis Chang": [
      "The risk assessment framework needs to be applied to your project.",
      "Please review the quality management standards in detail.",
      "We'll discuss risk mitigation strategies next class.",
      "Office hours are available if you need help with the assessment.",
    ],
    "Moataz El-Menshawy": [
      "Review the lean principles we discussed in class.",
      "The process mapping exercise is due next week.",
      "Make sure to identify waste in your process analysis.",
      "We'll cover Six Sigma concepts in tomorrow's lecture.",
    ],
    "Gabriella Marques": [
      "Consider how change management affects leadership decisions.",
      "Your leadership style analysis was well done.",
      "Next week we'll focus on organizational change models.",
      "Remember to prepare your change management case study.",
    ],
    "Charles Chen": [
      "Don't forget our daily scrum meeting tomorrow.",
      "Your sprint backlog needs to be updated.",
      "We'll review agile best practices in class.",
      "The retrospective meeting is scheduled for Friday.",
    ],
    "Kristin Matheson": [
      "Review the marketing mix components for next class.",
      "Your market analysis shows good insights.",
      "We'll discuss digital marketing strategies tomorrow.",
      "The consumer behavior presentation is due next week.",
    ],
    "42C Study Group": [
      "Jasmin Bartolome: How about we review Chapter 5 next time?",
      "Arvin Garcia: I can share my summary of the risk mitigation frameworks.",
      "Jashanpreet Kaur: Let's focus on the case studies from last week.",
      "Jasmin Bartolome: I found some great examples from previous projects.",
      "Arvin Garcia: Should we book a study room for next Tuesday?",
      "Jashanpreet Kaur: The process mapping templates were really helpful.",
      "Jasmin Bartolome: Anyone want to practice the presentation together?",
      "Arvin Garcia: I can explain the Six Sigma concepts we covered.",
    ],
    "Studiyo AI": [
      "I'd be happy to help you understand that concept.",
      "Here's a breakdown of the key points we covered.",
      "Would you like me to provide some practice examples?",
      "Let me know if you need any clarification.",
      "I can help you create a study plan for this topic.",
    ],
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (contact: Contact) => {
    const responses = botResponses[contact.name as keyof typeof botResponses];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "Me",
      content: newMessage,
      time: currentTime,
      isMe: true,
      status: "sent"
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");

    // Simulate bot typing
    setIsTyping(true);
    
    // Generate bot response after a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: selectedContact.name,
        content: generateBotResponse(selectedContact),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
        status: "read"
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botMessage]);

      // Update last message in contacts
      setContacts(prev => prev.map(contact => 
        contact.id === selectedContact.id 
          ? { ...contact, lastMessage: botMessage.content, time: "Just now" }
          : contact
      ));
    }, 2000);
  };

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sent":
        return <Check className="w-4 h-4" />;
      case "delivered":
        return <CheckCheck className="w-4 h-4 text-gray-500" />;
      case "read":
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-2rem)] py-4">
      <div className="bg-white rounded-lg shadow-sm h-full flex">
        {/* Contacts Sidebar */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold mb-4">Messages</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>

            {/* Chat Room Selector */}
            <select
              className="mt-4 w-full p-2 border border-gray-300 rounded"
              value={selectedContact.id}
              onChange={(e) => {
                const contact = contacts.find(c => c.id === e.target.value);
                if (contact) {
                  setSelectedContact(contact);
                  // Load messages for selected contact
                  setMessages(chatRooms[contact.id] || []);
                }
              }}
            >
              {contacts.map(contact => (
                <option key={contact.id} value={contact.id}>
                  {contact.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex items-start gap-3 ${
                  selectedContact.id === contact.id ? "bg-gray-50" : ""
                }`}
                onClick={() => {
                  setSelectedContact(contact);
                  setMessages(chatRooms[contact.id] || []);
                }}
              >
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium
                    ${contact.isBot ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 
                    contact.role === 'Group Chat' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' :
                    'bg-blue-100 text-blue-600'}`}>
                    {contact.avatar}
                  </div>
                  {contact.status === "online" && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {contact.name}
                      {contact.isBot && (
                        <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">Bot</span>
                      )}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{contact.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{contact.role}</p>
                  <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                </div>
                {contact.unread && (
                  <div className="ml-2 bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {contact.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium
                ${selectedContact.isBot ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 
                selectedContact.role === 'Group Chat' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' :
                'bg-blue-100 text-blue-600'}`}>
                {selectedContact.avatar}
              </div>
              <div>
                <h2 className="font-medium text-gray-900">
                  {selectedContact.name}
                  {selectedContact.isBot && (
                    <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">Bot</span>
                  )}
                </h2>
                <p className="text-sm text-gray-600">{selectedContact.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] ${
                    message.isMe
                      ? "bg-blue-600 text-white rounded-l-lg rounded-br-lg"
                      : "bg-gray-100 text-gray-900 rounded-r-lg rounded-bl-lg"
                  } p-3`}
                >
                  {selectedContact.role === "Group Chat" && !message.isMe && (
                    <p className="text-xs font-medium mb-1" style={{ color: message.isMe ? "#fff" : "#4B5563" }}>
                      {message.sender}
                    </p>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <div className={`text-xs mt-1 flex items-center gap-1 ${
                    message.isMe ? "text-blue-100" : "text-gray-500"
                  }`}>
                    {message.time}
                    {message.isMe && getStatusIcon(message.status)}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 rounded-lg p-3">
              <div className="flex items-center gap-2">
                {selectedContact.isBot ? (
                  <>
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs text-blue-600">AI</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                )}
              </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 py-2 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
                onClick={handleSendMessage}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
