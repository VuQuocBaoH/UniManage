
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Save, X, Users, Calendar, MapPin, Clock, User } from "lucide-react";

interface ClassDetailProps {
  classItem: any;
  onBack: () => void;
  onSave: (classItem: any) => void;
}

const ClassDetail = ({ classItem, onBack, onSave }: ClassDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedClass, setEditedClass] = useState(classItem);

  const handleSave = () => {
    onSave(editedClass);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedClass(classItem);
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
            <h2 className="text-2xl font-bold text-gray-900">Chi tiết Lớp học</h2>
            <p className="text-gray-600">Xem và chỉnh sửa thông tin lớp học</p>
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
        {/* Thông tin lớp học */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Thông tin lớp học
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên lớp học</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editedClass.name}
                    onChange={(e) => setEditedClass({...editedClass, name: e.target.value})}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{classItem.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="code">Mã lớp</Label>
                {isEditing ? (
                  <Input
                    id="code"
                    value={editedClass.code}
                    onChange={(e) => setEditedClass({...editedClass, code: e.target.value})}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{classItem.code}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Môn học</Label>
                {isEditing ? (
                  <Select
                    value={editedClass.subject}
                    onValueChange={(value) => setEditedClass({...editedClass, subject: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lập trình Web">Lập trình Web</SelectItem>
                      <SelectItem value="Cơ sở dữ liệu">Cơ sở dữ liệu</SelectItem>
                      <SelectItem value="Thuật toán">Thuật toán</SelectItem>
                      <SelectItem value="Mạng máy tính">Mạng máy tính</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{classItem.subject}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="teacher">Giảng viên</Label>
                {isEditing ? (
                  <Select
                    value={editedClass.teacher}
                    onValueChange={(value) => setEditedClass({...editedClass, teacher: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TS. Nguyễn Văn A">TS. Nguyễn Văn A</SelectItem>
                      <SelectItem value="ThS. Trần Thị B">ThS. Trần Thị B</SelectItem>
                      <SelectItem value="TS. Lê Văn C">TS. Lê Văn C</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="p-2 bg-gray-50 rounded flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    {classItem.teacher}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="room">Phòng học</Label>
                {isEditing ? (
                  <Input
                    id="room"
                    value={editedClass.room}
                    onChange={(e) => setEditedClass({...editedClass, room: e.target.value})}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    {classItem.room}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Thời gian học</Label>
                {isEditing ? (
                  <Input
                    id="time"
                    value={editedClass.time}
                    onChange={(e) => setEditedClass({...editedClass, time: e.target.value})}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {classItem.time}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="semester">Học kỳ</Label>
                {isEditing ? (
                  <Select
                    value={editedClass.semester}
                    onValueChange={(value) => setEditedClass({...editedClass, semester: value})}
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
                  <p className="p-2 bg-gray-50 rounded flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {classItem.semester}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="capacity">Sức chứa tối đa</Label>
                {isEditing ? (
                  <Input
                    id="capacity"
                    type="number"
                    value={editedClass.capacity}
                    onChange={(e) => setEditedClass({...editedClass, capacity: parseInt(e.target.value)})}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{classItem.capacity} students</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Ghi chú</Label>
              {isEditing ? (
                <Textarea
                  id="description"
                  value={editedClass.description}
                  onChange={(e) => setEditedClass({...editedClass, description: e.target.value})}
                  rows={3}
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded min-h-[80px]">{classItem.description || "Không có ghi chú"}</p>
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
              <Badge className={classItem.status === "Đang diễn ra" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                {classItem.status}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Số sinh viên hiện tại:</span>
              <span className="font-semibold">{classItem.students}/{classItem.capacity}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Tỷ lệ lấp đầy:</span>
              <span className="font-semibold">{Math.round((classItem.students / classItem.capacity) * 100)}%</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Ngày bắt đầu:</span>
              <span className="font-semibold">{classItem.startDate || "01/09/2024"}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Ngày kết thúc:</span>
              <span className="font-semibold">{classItem.endDate || "15/12/2024"}</span>
            </div>
            
            <div className="space-y-2">
              <span className="text-sm font-medium">Lịch học trong tuần:</span>
              <div className="text-sm space-y-1">
                <p>Thứ 2: 7:00 - 9:30</p>
                <p>Thứ 4: 13:00 - 15:30</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClassDetail;
