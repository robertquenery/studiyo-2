"use client";

import React, { useState, useEffect } from "react";
import { UserCircle, Mail, Phone, GraduationCap, Settings } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export default function ProfilePage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    studentId: "STU123456",
    email: "john.doe@university.edu",
    phone: "+1 (555) 123-4567",
    major: "Computer Science",
    year: "Junior (3rd Year)",
    gpa: "3.8/4.0",
    creditsCompleted: "85/120",
    emailNotifications: true,
    assignmentReminders: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Load user profile data
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFormData(prevData => ({
            ...prevData,
            ...userData
          }));
        } else {
          // Create initial profile document
          const initialData = {
            fullName: user.displayName || formData.fullName,
            email: user.email || formData.email,
            studentId: formData.studentId,
            phone: formData.phone,
            major: formData.major,
            year: formData.year,
            gpa: formData.gpa,
            creditsCompleted: formData.creditsCompleted,
            emailNotifications: formData.emailNotifications,
            assignmentReminders: formData.assignmentReminders,
          };
          
          await setDoc(userDocRef, initialData);
          setFormData(prevData => ({
            ...prevData,
            ...initialData
          }));
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        setError("Failed to load profile data. Please try refreshing the page.");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        fullName: formData.fullName,
        studentId: formData.studentId,
        phone: formData.phone,
        emailNotifications: formData.emailNotifications,
        assignmentReminders: formData.assignmentReminders,
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading profile...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow-sm">
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="p-6 space-y-8">
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <UserCircle className="w-5 h-5" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Student ID</label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <div className="mt-1 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-400">
              <GraduationCap className="w-5 h-5" />
              Academic Information
              <span className="text-sm font-normal">(Read-only)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="major" className="block text-sm font-medium text-gray-400">Major</label>
                <input
                  type="text"
                  id="major"
                  name="major"
                  value={formData.major}
                  disabled
                  className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-400">Year</label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  value={formData.year}
                  disabled
                  className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label htmlFor="gpa" className="block text-sm font-medium text-gray-400">GPA</label>
                <input
                  type="text"
                  id="gpa"
                  name="gpa"
                  value={formData.gpa}
                  disabled
                  className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label htmlFor="creditsCompleted" className="block text-sm font-medium text-gray-400">Credits Completed</label>
                <input
                  type="text"
                  id="creditsCompleted"
                  name="creditsCompleted"
                  value={formData.creditsCompleted}
                  disabled
                  className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive email updates about your courses</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={formData.emailNotifications}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Assignment Reminders</h3>
                  <p className="text-sm text-gray-600">Get notified before assignment deadlines</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="assignmentReminders"
                    checked={formData.assignmentReminders}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`px-6 py-2 rounded-md text-white font-semibold ${isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} transition-colors`}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {saveSuccess && (
            <div className="mt-4 text-green-600 font-medium">
              Profile updated successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
