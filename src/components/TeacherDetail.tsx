
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Save, X, Phone, Mail, MapPin, Calendar, User, Award, BookOpen } from "lucide-react";

interface TeacherDetailProps {
  teacher: any;
  onBack: () => void;
  onSave: (teacher: any) => void;
}

const TeacherDetail = ({ teacher, onBack, onSave }: TeacherDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTeacher, setEditedTeacher] = useState(teacher);

  const handleSave = () => {
    onSave(editedTeacher);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTeacher(teacher);
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
            <h2 className="text-2xl font-bold text-gray-900">Chi tiết Giảng viên</h2>
            <p className="text-gray-600">Xem và chỉnh sửa thông tin giảng viên</p>
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
        {/* Thông tin cá nhân */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Thông tin cá nhân
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editedTeacher.name}
                    onChange={(e) => setEditedTeacher({...editedTeacher, name: e.target.value})}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{teacher.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="teacherId">Mã giảng viên</Label>
                {isEditing ? (
                  <Input
                    id="teacherId"
                    value={editedTeacher.id}
                    onChange={(e) => setEditedTeacher({...editedTeacher, id: e.target.value})}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{teacher.id}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editedTeacher.email}
                    onChange={(e) => setEditedTeacher({...editedTeacher, email: e.target.value})}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    {teacher.email}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={editedTeacher.phone}
                    onChange={(e) => setEditedTeacher({...editedTeacher, phone: e.target.value})}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    {teacher.phone}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Khoa</Label>
                {isEditing ? (
                  <Select
                    value={editedTeacher.department}
                    onValueChange={(value) => setEditedTeacher({...editedTeacher, department: value})}
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
                  <p className="p-2 bg-gray-50 rounded">{teacher.department}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="degree">Học vị</Label>
                {isEditing ? (
                  <Select
                    value={editedTeacher.degree}
                    onValueChange={(value) => setEditedTeacher({...editedTeacher, degree: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tiến sĩ">Tiến sĩ</SelectItem>
                      <SelectItem value="Thạc sĩ">Thạc sĩ</SelectItem>
                      <SelectItem value="Cử nhân">Cử nhân</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="p-2 bg-gray-50 rounded flex items-center">
                    <Award className="mr-2 h-4 w-4" />
                    {teacher.degree}
                  </p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="specialization">Chuyên môn</Label>
              {isEditing ? (
                <Textarea
                  id="specialization"
                  value={editedTeacher.specialization}
                  onChange={(e) => setEditedTeacher({...editedTeacher, specialization: e.target.value})}
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded">{teacher.specialization}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Thông tin công việc */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin công việc</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Trạng thái:</span>
              <Badge className={teacher.status === "Đang làm việc" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                {teacher.status}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Số môn dạy:</span>
              <span className="font-semibold">{teacher.courses || "3"}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Kinh nghiệm:</span>
              <span className="font-semibold">{teacher.experience || "5 năm"}</span>
            </div>
            
            <div className="space-y-2">
              <span className="text-sm font-medium">Môn học phụ trách:</span>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary">Lập trình Web</Badge>
                <Badge variant="secondary">Cơ sở dữ liệu</Badge>
                <Badge variant="secondary">Thuật toán</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDetail;
