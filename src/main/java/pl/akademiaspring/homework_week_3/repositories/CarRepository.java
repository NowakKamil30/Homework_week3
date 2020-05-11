package pl.akademiaspring.homework_week_3.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.akademiaspring.homework_week_3.models.Car;

import java.util.Optional;

@Repository
public interface CarRepository extends CrudRepository<Car,Long> {
    public Iterable<Car> findAllByColor(String color);
}
