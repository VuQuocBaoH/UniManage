
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Bell, Send, Eye, Users, AlertCircle, Info, CheckCircle, Filter, FilterX } from "lucide-react";

const NotificationManagement = () => {
  const [notifications] = useState([
    {
      id: "TB001",
      title: "Thông báo lịch thi cuối kỳ HK1 2024-2025",
      content: "Lịch thi cuối kỳ học kỳ 1 năm học 2024-2025 đã được công bố. Sinh viên vui lòng kiểm tra và chuẩn bị...",
      type: "Thông báo chung",
      priority: "Cao",
      targetAudience: "Tất cả sinh viên",
      createdDate: "2024-01-15",
      publishDate: "2024-01-16",
      status: "Đã gửi",
      views: 1250,
      sender: "Phòng Đào tạo"
    },
    {
      id: "TB002",
      title: "Thay đổi lịch học môn Lập trình Web",
      content: "Do giảng viên có công tác đột xuất, lịch học môn Lập trình Web ngày 18/01 sẽ được chuyển sang...",
      type: "Thay đổi lịch học", 
      priority: "Trung bình",
      targetAudience: "Lớp IT301",
      createdDate: "2024-01-14",
      publishDate: "2024-01-14",
      status: "Đã gửi",
      views: 45,
      sender: "TS. Nguyễn Văn Minh"
    },
    {
      id: "TB003",
      title: "Hội thảo khoa học công nghệ thông tin 2024",
      content: "Khoa Công nghệ thông tin tổ chức hội thảo khoa học với chủ đề 'Trí tuệ nhân tạo trong giáo dục'...",
      type: "Sự kiện",
      priority: "Thấp",
      targetAudience: "Khoa CNTT",
      createdDate: "2024-01-13",
      publishDate: "2024-01-20",
      status: "Đã lên lịch",
      views: 0,
      sender: "Khoa CNTT"
    },
    {
      id: "TB004",
      title: "Thông báo nộp học phí học kỳ 2",
      content: "Thời hạn nộp học phí học kỳ 2 năm học 2024-2025 từ ngày 01/02 đến 28/02. Sinh viên chưa nộp...",
      type: "Tài chính",
      priority: "Cao", 
      targetAudience: "Tất cả sinh viên",
      createdDate: "2024-01-12",
      publishDate: "",
      status: "Nháp",
      views: 0,
      sender: "Phòng Tài chính"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.sender.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || notification.type === typeFilter;
    const matchesPriority = priorityFilter === "all" || notification.priority === priorityFilter;
    const matchesStatus = statusFilter === "all" || notification.status === statusFilter;

    return matchesSearch && matchesType && matchesPriority && matchesStatus;
  });

  const clearFilters = () => {
    setTypeFilter("all");
    setPriorityFilter("all");
    setStatusFilter("all");
    setSearchTerm("");
  };

  const hasActiveFilters = typeFilter !== "all" || priorityFilter !== "all" || statusFilter !== "all" || searchTerm !== "";

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Cao":
        return <Badge className="bg-red-100 text-red-800">Cao</Badge>;
      case "Trung bình":
        return <Badge className="bg-yellow-100 text-yellow-800">Trung bình</Badge>;
      case "Thấp":
        return <Badge className="bg-green-100 text-green-800">Thấp</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Đã gửi":
        return <Badge className="bg-green-100 text-green-800">Đã gửi</Badge>;
      case "Đã lên lịch":
        return <Badge className="bg-blue-100 text-blue-800">Đã lên lịch</Badge>;
      case "Nháp":
        return <Badge className="bg-gray-100 text-gray-800">Nháp</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Thông báo chung":
        return <Info className="h-4 w-4 text-blue-600" />;
      case "Thay đổi lịch học":
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case "Sự kiện":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Tài chính":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const uniqueTypes = [...new Set(notifications.map(n => n.type))];
  const uniquePriorities = [...new Set(notifications.map(n => n.priority))];
  const uniqueStatuses = [...new Set(notifications.map(n => n.status))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý Thông báo</h2>
          <p className="text-gray-600">Tạo và quản lý thông báo gửi đến sinh viên, giảng viên</p>
        </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tạo thông báo
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm theo tiêu đề, nội dung hoặc người gửi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} size="sm">
                  <FilterX className="h-4 w-4 mr-2" />
                  Xóa bộ lọc
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Loại thông báo</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc theo loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả loại</SelectItem>
                    {uniqueTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Mức độ ưu tiên</Label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc theo mức độ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả mức độ</SelectItem>
                    {uniquePriorities.map(priority => (
                      <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Trạng thái</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc theo trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    {uniqueStatuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {hasActiveFilters && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Filter className="h-4 w-4" />
                <span>Đang hiển thị {filteredNotifications.length} / {notifications.length} thông báo</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng thông báo</p>
                <p className="text-2xl font-bold text-gray-900">247</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đã gửi</p>
                <p className="text-2xl font-bold text-gray-900">198</p>
              </div>
              <Send className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lượt xem</p>
                <p className="text-2xl font-bold text-gray-900">12,845</p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ưu tiên cao</p>
                <p className="text-2xl font-bold text-gray-900">34</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách thông báo</CardTitle>
          <CardDescription>
            {hasActiveFilters ? `Tìm thấy ${filteredNotifications.length} thông báo` : `Tổng cộng ${filteredNotifications.length} thông báo`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thông báo</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Đối tượng</TableHead>
                <TableHead>Mức độ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Lượt xem</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    {hasActiveFilters ? "Không tìm thấy thông báo phù hợp với bộ lọc" : "Chưa có thông báo nào"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredNotifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {notification.content}
                        </div>
                        <div className="text-xs text-gray-400">
                          Bởi: {notification.sender}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(notification.type)}
                        <span className="text-sm">{notification.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="text-sm">{notification.targetAudience}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getPriorityBadge(notification.priority)}</TableCell>
                    <TableCell>{getStatusBadge(notification.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1 text-gray-400" />
                        {notification.views}
                      </div>
                    </TableCell>
                    <TableCell>{notification.createdDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationManagement;
