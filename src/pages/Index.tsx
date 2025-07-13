
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, GraduationCap, Calendar, TrendingUp, Award, Bell, Search, FileText, Clock, MessageSquare, AlertTriangle } from "lucide-react";
import DashboardStats from "@/components/DashboardStats";
import StudentManagement from "@/components/StudentManagement";
import TeacherManagement from "@/components/TeacherManagement";
import CourseManagement from "@/components/CourseManagement";
import ClassManagement from "@/components/ClassManagement";
import GradeManagement from "@/components/GradeManagement";
import ReportManagement from "@/components/ReportManagement";
import ScheduleManagement from "@/components/ScheduleManagement";
import NotificationManagement from "@/components/NotificationManagement";
import ExamScheduleManagement from "@/components/ExamScheduleManagement";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header with gradient */}
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">UniManager</h1>
                  <p className="text-sm text-blue-100">Hệ thống quản lý trường đại học</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Tìm kiếm..." 
                  className="pl-10 w-64 bg-white/90 backdrop-blur-sm border-white/20"
                />
              </div>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Bell className="h-4 w-4" />
              </Button>
              <Badge className="bg-white/20 text-white border-white/30">Admin</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Enhanced Sidebar */}
        <aside className="w-72 bg-white/80 backdrop-blur-sm shadow-xl h-screen sticky top-0 border-r border-gray-200/50">
          <nav className="p-6 space-y-2">
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Tổng quan</h3>
            </div>
            
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              className={`w-full justify-start h-12 ${
                activeTab === "dashboard" 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg" 
                  : "hover:bg-blue-50"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              <TrendingUp className="mr-3 h-5 w-5" />
              Dashboard
            </Button>
            
            <div className="mt-6 mb-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Quản lý</h3>
            </div>
            
            <Button
              variant={activeTab === "students" ? "default" : "ghost"}
              className={`w-full justify-start h-12 ${
                activeTab === "students" 
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg" 
                  : "hover:bg-green-50"
              }`}
              onClick={() => setActiveTab("students")}
            >
              <Users className="mr-3 h-5 w-5" />
              Quản lý Sinh viên
            </Button>
            
            <Button
              variant={activeTab === "teachers" ? "default" : "ghost"}
              className={`w-full justify-start h-12 ${
                activeTab === "teachers" 
                  ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg" 
                  : "hover:bg-purple-50"
              }`}
              onClick={() => setActiveTab("teachers")}
            >
              <Award className="mr-3 h-5 w-5" />
              Quản lý Giảng viên
            </Button>
            
            <Button
              variant={activeTab === "courses" ? "default" : "ghost"}
              className={`w-full justify-start h-12 ${
                activeTab === "courses" 
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg" 
                  : "hover:bg-orange-50"
              }`}
              onClick={() => setActiveTab("courses")}
            >
              <BookOpen className="mr-3 h-5 w-5" />
              Quản lý Môn học
            </Button>
            
            <Button
              variant={activeTab === "classes" ? "default" : "ghost"}
              className={`w-full justify-start h-12 ${
                activeTab === "classes" 
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg" 
                  : "hover:bg-cyan-50"
              }`}
              onClick={() => setActiveTab("classes")}
            >
              <Calendar className="mr-3 h-5 w-5" />
              Quản lý Lớp học
            </Button>
            
            <Button
              variant={activeTab === "grades" ? "default" : "ghost"}
              className={`w-full justify-start h-12 ${
                activeTab === "grades" 
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg" 
                  : "hover:bg-pink-50"
              }`}
              onClick={() => setActiveTab("grades")}
            >
              <FileText className="mr-3 h-5 w-5" />
              Quản lý Điểm số
            </Button>
            
            <div className="mt-6 mb-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Báo cáo & Lịch</h3>
            </div>
            
            <Button
              variant={activeTab === "reports" ? "default" : "ghost"}
              className={`w-full justify-start h-12 ${
                activeTab === "reports" 
                  ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg" 
                  : "hover:bg-teal-50"
              }`}
              onClick={() => setActiveTab("reports")}
            >
              <TrendingUp className="mr-3 h-5 w-5" />
              Báo cáo & Thống kê
            </Button>
            
            <Button
              variant={activeTab === "schedule" ? "default" : "ghost"}
              className={`w-full justify-start h-12 ${
                activeTab === "schedule" 
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg" 
                  : "hover:bg-yellow-50"
              }`}
              onClick={() => setActiveTab("schedule")}
            >
              <Clock className="mr-3 h-5 w-5" />
              Lịch học
            </Button>
            
            <Button
              variant={activeTab === "notifications" ? "default" : "ghost"}
              className={`w-full justify-start h-12 ${
                activeTab === "notifications" 
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg" 
                  : "hover:bg-indigo-50"
              }`}
              onClick={() => setActiveTab("notifications")}
            >
              <MessageSquare className="mr-3 h-5 w-5" />
              Thông báo
            </Button>
            
            <Button
              variant={activeTab === "exams" ? "default" : "ghost"}
              className={`w-full justify-start h-12 ${
                activeTab === "exams" 
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg" 
                  : "hover:bg-red-50"
              }`}
              onClick={() => setActiveTab("exams")}
            >
              <AlertTriangle className="mr-3 h-5 w-5" />
              Lịch thi
            </Button>
          </nav>
        </aside>

        {/* Main Content with enhanced styling */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              {activeTab === "dashboard" && <DashboardStats />}
              {activeTab === "students" && <StudentManagement />}
              {activeTab === "teachers" && <TeacherManagement />}
              {activeTab === "courses" && <CourseManagement />}
              {activeTab === "classes" && <ClassManagement />}
              {activeTab === "grades" && <GradeManagement />}
              {activeTab === "reports" && <ReportManagement />}
              {activeTab === "schedule" && <ScheduleManagement />}
              {activeTab === "notifications" && <NotificationManagement />}
              {activeTab === "exams" && <ExamScheduleManagement />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
