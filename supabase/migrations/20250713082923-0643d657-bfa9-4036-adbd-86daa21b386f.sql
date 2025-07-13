
-- Tạo bảng khoa/department
CREATE TABLE public.departments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tạo bảng sinh viên
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  major TEXT NOT NULL,
  year TEXT NOT NULL,
  gpa DECIMAL(3,2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Đang học',
  address TEXT,
  class TEXT,
  credits INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tạo bảng giảng viên
CREATE TABLE public.teachers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  department TEXT NOT NULL,
  degree TEXT NOT NULL,
  experience TEXT,
  status TEXT NOT NULL DEFAULT 'Đang làm việc',
  specialization TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tạo bảng môn học
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  faculty TEXT NOT NULL,
  credits INTEGER NOT NULL DEFAULT 0,
  duration TEXT,
  instructor TEXT,
  students INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Đang mở',
  department TEXT,
  semester TEXT,
  description TEXT,
  teacher TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tạo bảng lịch học
CREATE TABLE public.schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  schedule_id TEXT NOT NULL UNIQUE,
  course_code TEXT NOT NULL,
  course_name TEXT NOT NULL,
  instructor TEXT NOT NULL,
  day_of_week TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  room TEXT NOT NULL,
  building TEXT NOT NULL,
  semester TEXT NOT NULL,
  students INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Đang diễn ra',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Thêm dữ liệu mẫu cho sinh viên
INSERT INTO public.students (student_id, name, email, phone, major, year, gpa, status, address, class, credits) VALUES
('SV001', 'Nguyễn Văn An', 'an.nguyen@student.edu.vn', '0123456789', 'Công nghệ thông tin', '2024', 3.5, 'Đang học', '123 Đường ABC, Quận 1, TP.HCM', 'CNTT2024A', 120),
('SV002', 'Trần Thị Bình', 'binh.tran@student.edu.vn', '0987654321', 'Kinh tế', '2023', 3.8, 'Đang học', '456 Đường XYZ, Quận 2, TP.HCM', 'KT2023B', 95),
('SV003', 'Lê Văn Cường', 'cuong.le@student.edu.vn', '0369852147', 'Kỹ thuật', '2022', 3.2, 'Tạm dừng', '789 Đường DEF, Quận 3, TP.HCM', 'KT2022A', 80),
('SV004', 'Phạm Thị Dung', 'dung.pham@student.edu.vn', '0912345678', 'Ngoại ngữ', '2024', 3.9, 'Đang học', '321 Đường GHI, Quận 4, TP.HCM', 'NN2024C', 110),
('SV005', 'Hoàng Văn Em', 'em.hoang@student.edu.vn', '0923456789', 'Công nghệ thông tin', '2021', 2.8, 'Tốt nghiệp', '654 Đường JKL, Quận 5, TP.HCM', 'CNTT2021B', 140);

-- Thêm dữ liệu mẫu cho giảng viên
INSERT INTO public.teachers (teacher_id, name, email, phone, department, degree, experience, status, specialization) VALUES
('GV001', 'TS. Nguyễn Văn Minh', 'minh.nguyen@university.edu.vn', '0123456789', 'Công nghệ thông tin', 'Tiến sĩ', '8 năm', 'Đang làm việc', 'Lập trình Web, Cơ sở dữ liệu, Thuật toán'),
('GV002', 'ThS. Trần Thị Lan', 'lan.tran@university.edu.vn', '0987654321', 'Kinh tế', 'Thạc sĩ', '5 năm', 'Đang làm việc', 'Kinh tế vi mô, Kinh tế vĩ mô'),
('GV003', 'PGS.TS. Lê Hoàng Nam', 'nam.le@university.edu.vn', '0369852147', 'Kỹ thuật', 'Phó Giáo sư', '15 năm', 'Nghỉ phép', 'Cơ học kỹ thuật, Vật liệu xây dựng'),
('GV004', 'GS. Hoàng Thị Mai', 'mai.hoang@university.edu.vn', '0912345678', 'Ngoại ngữ', 'Giáo sư', '20 năm', 'Đang làm việc', 'Tiếng Anh thương mại, Dịch thuật'),
('GV005', 'ThS. Phan Văn Đức', 'duc.phan@university.edu.vn', '0923456789', 'Công nghệ thông tin', 'Thạc sĩ', '3 năm', 'Nghỉ hưu', 'Thuật toán, Cấu trúc dữ liệu');

-- Thêm dữ liệu mẫu cho môn học
INSERT INTO public.courses (course_id, name, code, faculty, credits, duration, instructor, students, status, department, semester, description, teacher) VALUES
('MH001', 'Lập trình Web', 'IT301', 'Công nghệ thông tin', 3, '45 tiết', 'TS. Nguyễn Văn Minh', 45, 'Đang mở', 'Công nghệ thông tin', 'HK1 2024-2025', 'Môn học cung cấp kiến thức cơ bản về lập trình web, HTML, CSS, JavaScript và các framework hiện đại.', 'TS. Nguyễn Văn Minh'),
('MH002', 'Kinh tế học Vi mô', 'ECO201', 'Kinh tế', 2, '30 tiết', 'ThS. Trần Thị Lan', 62, 'Đang mở', 'Kinh tế', 'HK1 2024-2025', 'Nghiên cứu hành vi của các đơn vị kinh tế cá nhân như hộ gia đình, doanh nghiệp.', 'ThS. Trần Thị Lan'),
('MH003', 'Cơ học Kỹ thuật', 'ENG101', 'Kỹ thuật', 4, '60 tiết', 'PGS.TS. Lê Hoàng Nam', 38, 'Tạm dừng', 'Kỹ thuật', 'HK1 2024-2025', 'Các nguyên lý cơ bản của cơ học ứng dụng trong kỹ thuật.', 'PGS.TS. Lê Hoàng Nam'),
('MH004', 'Tiếng Anh Thương mại', 'ENG205', 'Ngoại ngữ', 3, '45 tiết', 'GS. Hoàng Thị Mai', 32, 'Đã kết thúc', 'Ngoại ngữ', 'HK2 2023-2024', 'Tiếng Anh chuyên ngành thương mại, giao tiếp kinh doanh quốc tế.', 'GS. Hoàng Thị Mai'),
('MH005', 'Thuật toán và Cấu trúc dữ liệu', 'IT302', 'Công nghệ thông tin', 4, '60 tiết', 'ThS. Phan Văn Đức', 0, 'Tạm dừng', 'Công nghệ thông tin', 'HK2 2024-2025', 'Các thuật toán cơ bản và cấu trúc dữ liệu trong lập trình.', 'ThS. Phan Văn Đức');

-- Thêm dữ liệu mẫu cho lịch học
INSERT INTO public.schedules (schedule_id, course_code, course_name, instructor, day_of_week, time_slot, room, building, semester, students, status) VALUES
('LH001', 'IT301', 'Lập trình Web', 'TS. Nguyễn Văn Minh', 'Thứ 2', '07:30 - 09:30', 'A101', 'Nhà A', 'HK1 2024-2025', 45, 'Đang diễn ra'),
('LH002', 'ECO201', 'Kinh tế học Vi mô', 'ThS. Trần Thị Lan', 'Thứ 3', '09:30 - 11:30', 'B205', 'Nhà B', 'HK1 2024-2025', 62, 'Đang diễn ra'),
('LH003', 'ENG101', 'Cơ học Kỹ thuật', 'PGS.TS. Lê Hoàng Nam', 'Thứ 4', '13:30 - 15:30', 'C301', 'Nhà C', 'HK1 2024-2025', 38, 'Tạm hoãn'),
('LH004', 'ENG205', 'Tiếng Anh Thương mại', 'GS. Hoàng Thị Mai', 'Thứ 5', '15:30 - 17:30', 'D102', 'Nhà D', 'HK1 2024-2025', 32, 'Đã kết thúc'),
('LH005', 'IT302', 'Thuật toán và Cấu trúc dữ liệu', 'ThS. Phan Văn Đức', 'Thứ 6', '07:30 - 09:30', 'A203', 'Nhà A', 'HK1 2024-2025', 28, 'Sắp bắt đầu');

-- Enable Row Level Security (RLS) cho các bảng
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;

-- Tạo policies cho phép đọc dữ liệu công khai (vì đây là hệ thống quản lý trường học)
CREATE POLICY "Allow public read access" ON public.students FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.teachers FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.schedules FOR SELECT USING (true);
