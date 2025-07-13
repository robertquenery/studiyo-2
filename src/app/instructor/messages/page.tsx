"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Phone, Video, MoreVertical, Send, Paperclip, Check, CheckCheck } from "lucide-react";

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
  "4": [
    {
      id: "1",
      sender: "Robert John Quenery",
      content: "Don't forget our sprint planning session tomorrow.",
      time: "2:45 PM",
      isMe: false,
      status: "read"
    },
    {
      id: "2",
      sender: "Jasmin Angel Bartolome",
      content: "I'll have my backlog ready for review.",
      time: "2:46 PM",
      isMe: false,
      status: "read"
    },
    {
      id: "3",
      sender: "Arvin Jake Garcia",
      content: "Please send me the latest sprint backlog.",
      time: "2:47 PM",
      isMe: false,
      status: "read"
    },
    {
      id: "4",
      sender: "Jashanpreet Kaur",
      content: "Let's review the sprint goals in our next meeting.",
      time: "2:48 PM",
      isMe: false,
      status: "read"
    },
    {
      id: "5",
      sender: "Me",
      content: "Thanks for the updates, I'll prepare accordingly.",
      time: "2:49 PM",
      isMe: true,
      status: "read"
    }
  ]
};

export default function InstructorMessagesPage() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Robert John Quenery",
      role: "Student - PGMT 2002",
      avatar: "RJ",
      status: "online",
      isBot: false,
      lastMessage: "Don't forget our sprint planning session tomorrow.",
      time: "2:45 PM"
    },
    {
      id: "2",
      name: "Jasmin Angel Bartolome",
      role: "Student - PGMT 2002",
      avatar: "JA",
      status: "online",
      isBot: false,
      lastMessage: "I'll have my backlog ready for review.",
      time: "2:46 PM"
    },
    {
      id: "3",
      name: "Arvin Jake Garcia",
      role: "Student - PGMT 2002",
      avatar: "AG",
      status: "online",
      isBot: false,
      lastMessage: "Please send me the latest sprint backlog.",
      time: "2:47 PM"
    },
    {
      id: "4",
      name: "Jashanpreet Kaur",
      role: "Student - PGMT 2002",
      avatar: "JK",
      status: "online",
      isBot: false,
      lastMessage: "Let's review the sprint goals in our next meeting.",
      time: "2:48 PM"
    }
  ]);

  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>(chatRooms[contacts[0]?.id] || []);

  // Update messages when selectedContact changes
  React.useEffect(() => {
    if (selectedContact) {
      setMessages(chatRooms[selectedContact.id] || []);
    }
  }, [selectedContact]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const botResponses = {
    "Charles Chen": [
      "Thanks for the update, I'll prepare accordingly.",
      "Please send me the latest sprint backlog.",
      "Let's review the sprint goals in our next meeting.",
      "Remember to update your user stories.",
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm h-full flex">
        {/* Contacts Sidebar */}
        <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Messages</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
              <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-2.5" />
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
                className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex items-start gap-3 ${
                  selectedContact.id === contact.id ? "bg-gray-50 dark:bg-gray-700" : ""
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
                    'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'}`}>
                    {contact.avatar}
                  </div>
                  {contact.status === "online" && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {contact.name}
                      {contact.isBot && (
                        <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">Bot</span>
                      )}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">{contact.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{contact.role}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{contact.lastMessage}</p>
                </div>
                {contact.unread && (
                  <div className="ml-2 bg-blue-600 dark:bg-blue-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
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
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium
                  ${selectedContact.isBot ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 
                  selectedContact.role === 'Group Chat' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' :
                  'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'}`}>
                  {selectedContact.avatar}
                </div>
                <div>
                  <h2 className="font-medium text-gray-900 dark:text-gray-100">
                    {selectedContact.name}
                    {selectedContact.isBot && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">Bot</span>
                    )}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedContact.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
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
                        ? "bg-blue-600 dark:bg-blue-500 text-white rounded-l-lg rounded-br-lg"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-r-lg rounded-bl-lg"
                    } p-3`}
                  >
                    {selectedContact.role === "Group Chat" && !message.isMe && (
                      <p className="text-xs font-medium mb-1" style={{ color: message.isMe ? "#fff" : "#4B5563" }}>
                        {message.sender}
                      </p>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <div className={`text-xs mt-1 flex items-center gap-1 ${
                      message.isMe ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                    }`}>
                      {message.time}
                      {message.isMe && getStatusIcon(message.status)}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  {selectedContact.isBot ? (
                    <>
                      <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-xs text-blue-600 dark:text-blue-300">AI</span>
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
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 py-2 px-4 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
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
