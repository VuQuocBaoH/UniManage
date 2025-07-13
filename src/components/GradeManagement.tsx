
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, FileText, TrendingUp, Award, Filter, FilterX, Users, BookOpen, Calendar } from "lucide-react";

const GradeManagement = () => {
  const [grades] = useState([
    {
      id: "G001",
      studentId: "SV001",
      studentName: "Nguyễn Văn An",
      courseCode: "IT301",
      courseName: "Lập trình Web",
      department: "Công nghệ Thông tin",
      class: "IT19A1",
      year: "2024",
      midtermScore: 8.5,
      finalScore: 9.0,
      totalScore: 8.8,
      grade: "A",
      semester: "HK1 2024-2025",
      status: "Đã hoàn thành"
    },
    {
      id: "G002",
      studentId: "SV002", 
      studentName: "Trần Thị Bình",
      courseCode: "IT301",
      courseName: "Lập trình Web",
      department: "Công nghệ Thông tin",
      class: "IT19A2",
      year: "2024",
      midtermScore: 7.0,
      finalScore: 7.5,
      totalScore: 7.3,
      grade: "B+", 
      semester: "HK1 2024-2025",
      status: "Đã hoàn thành"
    },
    {
      id: "G003",
      studentId: "SV003",
      studentName: "Lê Hoàng Cường",
      courseCode: "ECO201",
      courseName: "Kinh tế học Vi mô",
      department: "Kinh tế",
      class: "KT19A1",
      year: "2024",
      midtermScore: 6.0,
      finalScore: 6.5,
      totalScore: 6.3,
      grade: "C+",
      semester: "HK1 2024-2025",
      status: "Đã hoàn thành"
    },
    {
      id: "G004", 
      studentId: "SV001",
      studentName: "Nguyễn Văn An",
      courseCode: "ENG205",
      courseName: "Tiếng Anh Thương mại",
      department: "Ngoại ngữ",
      class: "IT19A1",
      year: "2024",
      midtermScore: 9.0,
      finalScore: 8.5,
      totalScore: 8.7,
      grade: "A",
      semester: "HK1 2024-2025", 
      status: "Đang học"
    },
    {
      id: "G005",
      studentId: "SV004",
      studentName: "Phạm Thị Dung",
      courseCode: "IT301",
      courseName: "Lập trình Web",
      department: "Công nghệ Thông tin",
      class: "IT19A1",
      year: "2024",
      midtermScore: 8.0,
      finalScore: 8.5,
      totalScore: 8.3,
      grade: "A",
      semester: "HK1 2024-2025",
      status: "Đã hoàn thành"
    },
    {
      id: "G006",
      studentId: "SV005",
      studentName: "Hoàng Văn Em",
      courseCode: "ECO201",
      courseName: "Kinh tế học Vi mô",
      department: "Kinh tế",
      class: "KT19A2",
      year: "2023",
      midtermScore: 7.5,
      finalScore: 8.0,
      totalScore: 7.8,
      grade: "B+",
      semester: "HK2 2023-2024",
      status: "Đã hoàn thành"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("by-course"); // "by-course" or "detailed"

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = yearFilter === "all" || grade.year === yearFilter;
    const matchesDepartment = departmentFilter === "all" || grade.department === departmentFilter;
    const matchesClass = classFilter === "all" || grade.class === classFilter;
    const matchesCourse = courseFilter === "all" || grade.courseCode === courseFilter;
    const matchesStatus = statusFilter === "all" || grade.status === statusFilter;

    return matchesSearch && matchesYear && matchesDepartment && matchesClass && matchesCourse && matchesStatus;
  });

  // Group grades by course
  const gradesByCourse = filteredGrades.reduce((acc, grade) => {
    const key = `${grade.courseCode}-${grade.courseName}`;
    if (!acc[key]) {
      acc[key] = {
        courseCode: grade.courseCode,
        courseName: grade.courseName,
        department: grade.department,
        grades: [],
        totalStudents: 0,
        averageScore: 0,
        gradeDistribution: { A: 0, B: 0, C: 0, D: 0, F: 0 }
      };
    }
    acc[key].grades.push(grade);
    return acc;
  }, {} as Record<string, any>);

  // Calculate statistics for each course
  Object.keys(gradesByCourse).forEach(key => {
    const course = gradesByCourse[key];
    course.totalStudents = course.grades.length;
    course.averageScore = course.grades.reduce((sum: number, g: any) => sum + g.totalScore, 0) / course.totalStudents;
    
    course.grades.forEach((g: any) => {
      const gradeLevel = g.grade.charAt(0); // Get first character (A, B, C, etc.)
      if (course.gradeDistribution[gradeLevel] !== undefined) {
        course.gradeDistribution[gradeLevel]++;
      }
    });
  });

  const clearFilters = () => {
    setYearFilter("all");
    setDepartmentFilter("all");
    setClassFilter("all");
    setCourseFilter("all");
    setStatusFilter("all");
    setSearchTerm("");
  };

  const hasActiveFilters = yearFilter !== "all" || departmentFilter !== "all" || classFilter !== "all" || 
    courseFilter !== "all" || statusFilter !== "all" || searchTerm !== "";

  const getGradeBadge = (grade: string) => {
    if (grade === "A" || grade === "A+") return <Badge className="bg-green-100 text-green-800">{grade}</Badge>;
    if (grade === "B+" || grade === "B") return <Badge className="bg-blue-100 text-blue-800">{grade}</Badge>;
    if (grade === "C+" || grade === "C") return <Badge className="bg-yellow-100 text-yellow-800">{grade}</Badge>;
    return <Badge className="bg-red-100 text-red-800">{grade}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Đã hoàn thành":
        return <Badge className="bg-green-100 text-green-800">Đã hoàn thành</Badge>;
      case "Đang học":
        return <Badge className="bg-blue-100 text-blue-800">Đang học</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý Điểm số</h2>
          <p className="text-gray-600">Theo dõi và quản lý điểm số theo môn học, khoa, lớp và năm</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "by-course" ? "default" : "outline"}
            onClick={() => setViewMode("by-course")}
            size="sm"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Theo môn học
          </Button>
          <Button
            variant={viewMode === "detailed" ? "default" : "outline"}
            onClick={() => setViewMode("detailed")}
            size="sm"
          >
            <FileText className="mr-2 h-4 w-4" />
            Chi tiết
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nhập điểm
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm theo tên sinh viên, mã môn hoặc tên môn..."
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
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Năm học</Label>
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc theo năm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả năm</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Khoa</Label>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc theo khoa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả khoa</SelectItem>
                    <SelectItem value="Công nghệ Thông tin">Công nghệ Thông tin</SelectItem>
                    <SelectItem value="Kinh tế">Kinh tế</SelectItem>
                    <SelectItem value="Ngoại ngữ">Ngoại ngữ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Lớp</Label>
                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc theo lớp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả lớp</SelectItem>
                    <SelectItem value="IT19A1">IT19A1</SelectItem>
                    <SelectItem value="IT19A2">IT19A2</SelectItem>
                    <SelectItem value="KT19A1">KT19A1</SelectItem>
                    <SelectItem value="KT19A2">KT19A2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Môn học</Label>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc theo môn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả môn</SelectItem>
                    <SelectItem value="IT301">IT301 - Lập trình Web</SelectItem>
                    <SelectItem value="ECO201">ECO201 - Kinh tế Vi mô</SelectItem>
                    <SelectItem value="ENG205">ENG205 - Tiếng Anh TM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Trạng thái</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Lọc trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="Đã hoàn thành">Đã hoàn thành</SelectItem>
                    <SelectItem value="Đang học">Đang học</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng môn học</p>
                <p className="text-2xl font-bold text-gray-900">{Object.keys(gradesByCourse).length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng sinh viên</p>
                <p className="text-2xl font-bold text-gray-900">{filteredGrades.length}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Điểm TB chung</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredGrades.length > 0 
                    ? (filteredGrades.reduce((sum, g) => sum + g.totalScore, 0) / filteredGrades.length).toFixed(1)
                    : "0"
                  }
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Xuất sắc (A)</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredGrades.filter(g => g.grade.startsWith('A')).length}
                </p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      {viewMode === "by-course" ? (
        // Course-based view
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(gradesByCourse).map(([key, course]) => (
            <Card key={key}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{course.courseName}</CardTitle>
                    <CardDescription>
                      {course.courseCode} • {course.department}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    <Users className="h-3 w-3 mr-1" />
                    {course.totalStudents} SV
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Điểm trung bình:</span>
                    <span className="font-bold text-lg text-blue-600">
                      {course.averageScore.toFixed(1)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Phân bố điểm:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>Loại A:</span>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          {course.gradeDistribution.A}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>Loại B:</span>
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          {course.gradeDistribution.B}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>Loại C:</span>
                        <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                          {course.gradeDistribution.C}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>Khác:</span>
                        <Badge className="bg-gray-100 text-gray-800 text-xs">
                          {course.gradeDistribution.D + course.gradeDistribution.F}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <Button variant="outline" size="sm" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Detailed view
        <Card>
          <CardHeader>
            <CardTitle>Bảng điểm chi tiết</CardTitle>
            <CardDescription>
              {hasActiveFilters ? `Tìm thấy ${filteredGrades.length} kết quả` : `Tổng cộng ${filteredGrades.length} bản ghi`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sinh viên</TableHead>
                  <TableHead>Môn học</TableHead>
                  <TableHead>Khoa/Lớp</TableHead>
                  <TableHead>Năm</TableHead>
                  <TableHead>Điểm GK</TableHead>
                  <TableHead>Điểm CK</TableHead>
                  <TableHead>Điểm TB</TableHead>
                  <TableHead>Xếp loại</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrades.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                      {hasActiveFilters ? "Không tìm thấy kết quả phù hợp" : "Chưa có dữ liệu điểm"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredGrades.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{grade.studentName}</div>
                          <div className="text-sm text-gray-500">{grade.studentId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{grade.courseName}</div>
                          <div className="text-sm text-gray-500">{grade.courseCode}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">{grade.department}</div>
                          <div className="text-sm text-gray-500">{grade.class}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{grade.year}</Badge>
                      </TableCell>
                      <TableCell className="text-center font-medium">{grade.midtermScore}</TableCell>
                      <TableCell className="text-center font-medium">{grade.finalScore}</TableCell>
                      <TableCell className="text-center font-bold text-blue-600">{grade.totalScore}</TableCell>
                      <TableCell>{getGradeBadge(grade.grade)}</TableCell>
                      <TableCell>{getStatusBadge(grade.status)}</TableCell>
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
      )}
    </div>
  );
};

export default GradeManagement;
