
-- Thêm policies cho phép INSERT, UPDATE, DELETE cho bảng students
CREATE POLICY "Allow public insert access" ON public.students FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON public.students FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON public.students FOR DELETE USING (true);

-- Thêm policies cho phép INSERT, UPDATE, DELETE cho bảng teachers
CREATE POLICY "Allow public insert access" ON public.teachers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON public.teachers FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON public.teachers FOR DELETE USING (true);

-- Thêm policies cho phép INSERT, UPDATE, DELETE cho bảng courses
CREATE POLICY "Allow public insert access" ON public.courses FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON public.courses FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON public.courses FOR DELETE USING (true);

-- Thêm policies cho phép INSERT, UPDATE, DELETE cho bảng schedules
CREATE POLICY "Allow public insert access" ON public.schedules FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON public.schedules FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON public.schedules FOR DELETE USING (true);
