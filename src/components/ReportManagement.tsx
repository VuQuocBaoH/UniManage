
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Download, FileText, TrendingUp, Users, BookOpen, Calendar } from "lucide-react";

const ReportManagement = () => {
  const [reportType, setReportType] = useState("academic");
  const [timeFilter, setTimeFilter] = useState("semester");

  const gradeDistribution = [
    { grade: 'A+', count: 125, percentage: 12.5 },
    { grade: 'A', count: 248, percentage: 24.8 },
    { grade: 'B+', count: 312, percentage: 31.2 },
    { grade: 'B', count: 186, percentage: 18.6 },
    { grade: 'C+', count: 89, percentage: 8.9 },
    { grade: 'C', count: 40, percentage: 4.0 }
  ];

  const enrollmentTrend = [
    { month: 'T1', students: 1200 },
    { month: 'T2', students: 1250 },
    { month: 'T3', students: 1300 },
    { month: 'T4', students: 1280 },
    { month: 'T5', students: 1350 },
    { month: 'T6', students: 1400 }
  ];

  const facultyStats = [
    { name: 'CNTT', students: 450, color: '#8884d8' },
    { name: 'Kinh tế', students: 380, color: '#82ca9d' },
    { name: 'Kỹ thuật', students: 320, color: '#ffc658' },
    { name: 'Ngoại ngữ', students: 250, color: '#ff7300' }
  ];

  const recentReports = [
    {
      id: "R001",
      title: "Báo cáo học tập HK1 2024-2025",
      type: "Học tập",
      createdDate: "2024-01-15",
      status: "Hoàn thành",
      downloads: 45
    },
    {
      id: "R002", 
      title: "Thống kê tuyển sinh 2024",
      type: "Tuyển sinh",
      createdDate: "2024-01-10",
      status: "Hoàn thành", 
      downloads: 128
    },
    {
      id: "R003",
      title: "Báo cáo tài chính Q4 2023",
      type: "Tài chính",
      createdDate: "2024-01-05",
      status: "Đang xử lý",
      downloads: 23
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Hoàn thành":
        return <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>;
      case "Đang xử lý":
        return <Badge className="bg-yellow-100 text-yellow-800">Đang xử lý</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Báo cáo & Thống kê</h2>
          <p className="text-gray-600">Phân tích dữ liệu và tạo báo cáo chi tiết</p>
        </div>
        
        <div className="flex space-x-2">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Loại báo cáo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="academic">Học tập</SelectItem>
              <SelectItem value="enrollment">Tuyển sinh</SelectItem>
              <SelectItem value="financial">Tài chính</SelectItem>
              <SelectItem value="faculty">Khoa/Bộ môn</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semester">Học kỳ</SelectItem>
              <SelectItem value="year">Năm học</SelectItem>
              <SelectItem value="quarter">Quý</SelectItem>
            </SelectContent>
          </Select>
          
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng sinh viên</p>
                <p className="text-2xl font-bold text-gray-900">1,400</p>
                <p className="text-xs text-green-600">+5.2% so với kỳ trước</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Số môn học</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
                <p className="text-xs text-green-600">+12 môn mới</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Điểm TB toàn trường</p>
                <p className="text-2xl font-bold text-gray-900">7.8</p>
                <p className="text-xs text-green-600">+0.3 điểm</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tỷ lệ đậu</p>
                <p className="text-2xl font-bold text-gray-900">92.5%</p>
                <p className="text-xs text-green-600">+2.1%</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Phân bố điểm số</CardTitle>
            <CardDescription>Thống kê xếp loại học tập theo học kỳ</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradeDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Xu hướng tuyển sinh</CardTitle>
            <CardDescription>Số lượng sinh viên theo tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sinh viên theo khoa</CardTitle>
            <CardDescription>Phân bố sinh viên các khoa</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={facultyStats}
                  cx="50%"
                  cy="45%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="students"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {facultyStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Báo cáo gần đây</CardTitle>
            <CardDescription>Danh sách các báo cáo đã tạo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium">{report.title}</h4>
                      <p className="text-sm text-gray-500">{report.type} • {report.createdDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(report.status)}
                    <div className="text-right">
                      <p className="text-sm font-medium">{report.downloads} lượt tải</p>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportManagement;
