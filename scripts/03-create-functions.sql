-- Create functions and triggers

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_professionals_updated_at BEFORE UPDATE ON professionals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update professional rating
CREATE OR REPLACE FUNCTION update_professional_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE professionals 
    SET 
        rating = (
            SELECT AVG(rating)::DECIMAL(3,2) 
            FROM reviews 
            WHERE professional_id = NEW.professional_id
        ),
        total_reviews = (
            SELECT COUNT(*) 
            FROM reviews 
            WHERE professional_id = NEW.professional_id
        )
    WHERE id = NEW.professional_id;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update professional rating when review is added
CREATE TRIGGER update_professional_rating_trigger 
    AFTER INSERT OR UPDATE ON reviews 
    FOR EACH ROW 
    WHEN (NEW.professional_id IS NOT NULL)
    EXECUTE FUNCTION update_professional_rating();

-- Function to update course rating
CREATE OR REPLACE FUNCTION update_course_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE courses 
    SET 
        rating = (
            SELECT AVG(rating)::DECIMAL(3,2) 
            FROM reviews 
            WHERE course_id = NEW.course_id
        ),
        total_reviews = (
            SELECT COUNT(*) 
            FROM reviews 
            WHERE course_id = NEW.course_id
        )
    WHERE id = NEW.course_id;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update course rating when review is added
CREATE TRIGGER update_course_rating_trigger 
    AFTER INSERT OR UPDATE ON reviews 
    FOR EACH ROW 
    WHEN (NEW.course_id IS NOT NULL)
    EXECUTE FUNCTION update_course_rating();

-- Function to update client statistics
CREATE OR REPLACE FUNCTION update_client_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
        UPDATE clients 
        SET 
            total_services = total_services + 1,
            total_spent = total_spent + NEW.total_price,
            last_service_date = NEW.appointment_date
        WHERE id = NEW.client_id;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update client stats when appointment is completed
CREATE TRIGGER update_client_stats_trigger 
    AFTER UPDATE ON appointments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_client_stats();
