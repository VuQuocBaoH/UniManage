
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, GraduationCap, Calendar, TrendingUp, Award, Clock, FileText } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const DashboardStats = () => {
  const stats = [
    {
      title: "Tổng sinh viên",
      value: "2,456",
      change: "+12%",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Giảng viên",
      value: "156",
      change: "+3%",
      icon: Award,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      title: "Môn học",
      value: "89",
      change: "+5%",
      icon: BookOpen,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      title: "Lớp học",
      value: "234",
      change: "+8%",
      icon: Calendar,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    }
  ];

  const monthlyData = [
    { name: 'T1', students: 2100, courses: 78, classes: 210 },
    { name: 'T2', students: 2180, courses: 82, classes: 215 },
    { name: 'T3', students: 2250, courses: 85, classes: 220 },
    { name: 'T4', students: 2320, courses: 87, classes: 225 },
    { name: 'T5', students: 2400, courses: 89, classes: 230 },
    { name: 'T6', students: 2456, courses: 89, classes: 234 },
  ];

  const gradeDistribution = [
    { name: 'Xuất sắc', value: 15, color: '#10B981' },
    { name: 'Giỏi', value: 25, color: '#3B82F6' },
    { name: 'Khá', value: 35, color: '#F59E0B' },
    { name: 'Trung bình', value: 20, color: '#EF4444' },
    { name: 'Yếu', value: 5, color: '#6B7280' },
  ];

  const facultyData = [
    { name: 'CNTT', students: 450, teachers: 32 },
    { name: 'Kinh tế', students: 380, teachers: 28 },
    { name: 'Kỹ thuật', students: 520, teachers: 35 },
    { name: 'Ngoại ngữ', students: 320, teachers: 25 },
    { name: 'Khoa học', students: 290, teachers: 22 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard Tổng quan</h1>
            <p className="text-indigo-100">Hệ thống quản lý trường đại học</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <TrendingUp className="h-12 w-12 text-white" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.textColor}`} />
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                    {stat.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trends */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="text-gray-800 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
              Xu hướng theo tháng
            </CardTitle>
            <CardDescription>Thống kê sinh viên, môn học và lớp học</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '12px', 
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="#3B82F6" strokeWidth={3} name="Sinh viên" />
                <Line type="monotone" dataKey="courses" stroke="#10B981" strokeWidth={3} name="Môn học" />
                <Line type="monotone" dataKey="classes" stroke="#F59E0B" strokeWidth={3} name="Lớp học" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="text-gray-800 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-green-600" />
              Phân bố điểm số
            </CardTitle>
            <CardDescription>Tỷ lệ phân loại học lực sinh viên</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '12px', 
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Faculty Statistics */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
          <CardTitle className="text-gray-800 flex items-center">
            <GraduationCap className="mr-2 h-5 w-5 text-purple-600" />
            Thống kê theo khoa
          </CardTitle>
          <CardDescription>Số lượng sinh viên và giảng viên theo từng khoa</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={facultyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '12px', 
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                }} 
              />
              <Legend />
              <Bar dataKey="students" fill="#8B5CF6" name="Sinh viên" radius={[4, 4, 0, 0]} />
              <Bar dataKey="teachers" fill="#EC4899" name="Giảng viên" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Thêm sinh viên mới</h3>
                <p className="text-sm text-gray-600">Đăng ký sinh viên vào hệ thống</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Tạo môn học mới</h3>
                <p className="text-sm text-gray-600">Thiết lập môn học trong hệ thống</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Lập lịch học</h3>
                <p className="text-sm text-gray-600">Sắp xếp thời khóa biểu lớp học</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;
