
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, BookOpen, Users, Clock, Filter, FilterX } from "lucide-react";
import CourseDetail from "./CourseDetail";

const CourseManagement = () => {
  const [courses] = useState([
    {
      id: "MH001",
      name: "Lập trình Web",
      code: "IT301",
      faculty: "Công nghệ thông tin",
      credits: 3,
      duration: "45 tiết",
      instructor: "TS. Nguyễn Văn Minh",
      students: 45,
      status: "Đang mở",
      department: "Công nghệ thông tin",
      semester: "HK1 2024-2025",
      description: "Môn học cung cấp kiến thức cơ bản về lập trình web, HTML, CSS, JavaScript và các framework hiện đại.",
      teacher: "TS. Nguyễn Văn Minh"
    },
    {
      id: "MH002", 
      name: "Kinh tế học Vi mô",
      code: "ECO201",
      faculty: "Kinh tế", 
      credits: 2,
      duration: "30 tiết",
      instructor: "ThS. Trần Thị Lan",
      students: 62,
      status: "Đang mở",
      department: "Kinh tế",
      semester: "HK1 2024-2025",
      description: "Nghiên cứu hành vi của các đơn vị kinh tế cá nhân như hộ gia đình, doanh nghiệp.",
      teacher: "ThS. Trần Thị Lan"
    },
    {
      id: "MH003",
      name: "Cơ học Kỹ thuật",
      code: "ENG101", 
      faculty: "Kỹ thuật",
      credits: 4,
      duration: "60 tiết",
      instructor: "PGS.TS. Lê Hoàng Nam",
      students: 38,
      status: "Tạm dừng",
      department: "Kỹ thuật",
      semester: "HK1 2024-2025",
      description: "Các nguyên lý cơ bản của cơ học ứng dụng trong kỹ thuật.",
      teacher: "PGS.TS. Lê Hoàng Nam"
    },
    {
      id: "MH004",
      name: "Tiếng Anh Thương mại",
      code: "ENG205",
      faculty: "Ngoại ngữ",
      credits: 3,
      duration: "45 tiết",
      instructor: "GS. Hoàng Thị Mai",
      students: 32,
      status: "Đã kết thúc",
      department: "Ngoại ngữ",
      semester: "HK2 2023-2024",
      description: "Tiếng Anh chuyên ngành thương mại, giao tiếp kinh doanh quốc tế.",
      teacher: "GS. Hoàng Thị Mai"
    },
    {
      id: "MH005",
      name: "Thuật toán và Cấu trúc dữ liệu",
      code: "IT302",
      faculty: "Công nghệ thông tin",
      credits: 4,
      duration: "60 tiết",
      instructor: "ThS. Phan Văn Đức",
      students: 0,
      status: "Tạm dừng",
      department: "Công nghệ thông tin",
      semester: "HK2 2024-2025",
      description: "Các thuật toán cơ bản và cấu trúc dữ liệu trong lập trình.",
      teacher: "ThS. Phan Văn Đức"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [creditsFilter, setCreditsFilter] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.faculty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFaculty = facultyFilter === "all" || course.faculty === facultyFilter;
    const matchesStatus = statusFilter === "all" || course.status === statusFilter;
    const matchesCredits = creditsFilter === "all" || course.credits.toString() === creditsFilter;

    return matchesSearch && matchesFaculty && matchesStatus && matchesCredits;
  });

  const clearFilters = () => {
    setFacultyFilter("all");
    setStatusFilter("all");
    setCreditsFilter("all");
    setSearchTerm("");
  };

  const hasActiveFilters = facultyFilter !== "all" || statusFilter !== "all" || creditsFilter !== "all" || searchTerm !== "";

  const handleEdit = (course: any) => {
    setSelectedCourse(course);
    setShowDetail(true);
  };

  const handleDelete = (course: any) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa môn học ${course.name}?`)) {
      console.log("Deleting course:", course.id);
      // TODO: Implement delete functionality
    }
  };

  const handleSave = (updatedCourse: any) => {
    console.log("Saving course:", updatedCourse);
    // TODO: Implement save functionality
    setShowDetail(false);
    setSelectedCourse(null);
  };

  const handleBack = () => {
    setShowDetail(false);
    setSelectedCourse(null);
  };

  if (showDetail && selectedCourse) {
    return (
      <CourseDetail
        course={selectedCourse}
        onBack={handleBack}
        onSave={handleSave}
      />
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Đang mở":
        return <Badge className="bg-green-100 text-green-800">Đang mở</Badge>;
      case "Tạm dừng":
        return <Badge className="bg-yellow-100 text-yellow-800">Tạm dừng</Badge>;
      case "Đã kết thúc":
        return <Badge className="bg-gray-100 text-gray-800">Đã kết thúc</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const uniqueFaculties = [...new Set(courses.map(c => c.faculty))];
  const uniqueStatuses = [...new Set(courses.map(c => c.status))];
  const uniqueCredits = [...new Set(courses.map(c => c.credits))].sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý Môn học</h2>
          <p className="text-gray-600">Danh sách các môn học và khóa học trong trường</p>
        </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm Môn học
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
                  placeholder="Tìm kiếm theo tên môn học, mã môn hoặc khoa..."
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
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Khoa</Label>
                <Select value={facultyFilter} onValueChange={setFacultyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc theo khoa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả khoa</SelectItem>
                    {uniqueFaculties.map(faculty => (
                      <SelectItem key={faculty} value={faculty}>{faculty}</SelectItem>
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
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Số tín chỉ</Label>
                <Select value={creditsFilter} onValueChange={setCreditsFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc theo tín chỉ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả tín chỉ</SelectItem>
                    {uniqueCredits.map(credits => (
                      <SelectItem key={credits} value={credits.toString()}>{credits} tín chỉ</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {hasActiveFilters && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Filter className="h-4 w-4" />
                <span>Đang hiển thị {filteredCourses.length} / {courses.length} môn học</span>
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
                <p className="text-sm font-medium text-gray-600">Tổng Môn học</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đang mở</p>
                <p className="text-2xl font-bold text-gray-900">72</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng Sinh viên</p>
                <p className="text-2xl font-bold text-gray-900">2,845</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">TB Học viên/Môn</p>
                <p className="text-2xl font-bold text-gray-900">48</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Môn học</CardTitle>
          <CardDescription>
            {hasActiveFilters ? `Tìm thấy ${filteredCourses.length} môn học` : `Tổng cộng ${filteredCourses.length} môn học`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã môn</TableHead>
                <TableHead>Tên môn học</TableHead>
                <TableHead>Khoa</TableHead>
                <TableHead>Thông tin</TableHead>
                <TableHead>Giảng viên</TableHead>
                <TableHead>Sinh viên</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    {hasActiveFilters ? "Không tìm thấy môn học phù hợp với bộ lọc" : "Chưa có môn học nào"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.code}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{course.name}</div>
                        <div className="text-sm text-gray-500">ID: {course.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>{course.faculty}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <BookOpen className="h-3 w-3 mr-1 text-blue-600" />
                          {course.credits} tín chỉ
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-3 w-3 mr-1" />
                          {course.duration}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                        {course.students}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(course.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(course)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(course)}>
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

export default CourseManagement;
