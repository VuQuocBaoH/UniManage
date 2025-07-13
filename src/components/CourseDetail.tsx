
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Save, X, BookOpen, Clock, Users, Award } from "lucide-react";

interface CourseDetailProps {
  course: any;
  onBack: () => void;
  onSave: (course: any) => void;
}

const CourseDetail = ({ course, onBack, onSave }: CourseDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCourse, setEditedCourse] = useState(course);

  const handleSave = () => {
    onSave(editedCourse);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedCourse(course);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Chi tiết Môn học</h2>
            <p className="text-gray-600">Xem và chỉnh sửa thông tin môn học</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Hủy
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Lưu
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thông tin môn học */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Thông tin môn học
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên môn học</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editedCourse.name}
                    onChange={(e) => setEditedCourse({...editedCourse, name: e.target.value})}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{course.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="code">Mã môn học</Label>
                {isEditing ? (
                  <Input
                    id="code"
                    value={editedCourse.code}
                    onChange={(e) => setEditedCourse({...editedCourse, code: e.target.value})}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{course.code}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="credits">Số tín chỉ</Label>
                {isEditing ? (
                  <Input
                    id="credits"
                    type="number"
                    value={editedCourse.credits}
                    onChange={(e) => setEditedCourse({...editedCourse, credits: parseInt(e.target.value)})}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded flex items-center">
                    <Award className="mr-2 h-4 w-4" />
                    {course.credits} tín chỉ
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Thời lượng</Label>
                {isEditing ? (
                  <Input
                    id="duration"
                    value={editedCourse.duration}
                    onChange={(e) => setEditedCourse({...editedCourse, duration: e.target.value})}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {course.duration}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Khoa</Label>
                {isEditing ? (
                  <Select
                    value={editedCourse.department}
                    onValueChange={(value) => setEditedCourse({...editedCourse, department: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Công nghệ thông tin">Công nghệ thông tin</SelectItem>
                      <SelectItem value="Kinh tế">Kinh tế</SelectItem>
                      <SelectItem value="Ngoại ngữ">Ngoại ngữ</SelectItem>
                      <SelectItem value="Kỹ thuật">Kỹ thuật</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{course.department}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="semester">Học kỳ</Label>
                {isEditing ? (
                  <Select
                    value={editedCourse.semester}
                    onValueChange={(value) => setEditedCourse({...editedCourse, semester: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HK1 2024-2025">HK1 2024-2025</SelectItem>
                      <SelectItem value="HK2 2024-2025">HK2 2024-2025</SelectItem>
                      <SelectItem value="HK3 2024-2025">HK3 2024-2025</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{course.semester}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả môn học</Label>
              {isEditing ? (
                <Textarea
                  id="description"
                  value={editedCourse.description}
                  onChange={(e) => setEditedCourse({...editedCourse, description: e.target.value})}
                  rows={4}
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded min-h-[100px]">{course.description}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Thông tin thống kê */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin thống kê</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Trạng thái:</span>
              <Badge className={course.status === "Đang mở" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                {course.status}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Số sinh viên:</span>
              <span className="font-semibold flex items-center">
                <Users className="mr-1 h-4 w-4" />
                {course.students || "45"}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Giảng viên:</span>
              <span className="font-semibold">{course.teacher || "TS. Nguyễn Văn A"}</span>
            </div>
            
            <div className="space-y-2">
              <span className="text-sm font-medium">Điều kiện tiên quyết:</span>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">Toán cao cấp</Badge>
                <Badge variant="outline">Cơ sở lập trình</Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <span className="text-sm font-medium">Lịch học:</span>
              <div className="text-sm space-y-1">
                <p>Thứ 2: 7:00 - 9:30</p>
                <p>Thứ 4: 13:00 - 15:30</p>
                <p>Phòng: A201</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseDetail;
