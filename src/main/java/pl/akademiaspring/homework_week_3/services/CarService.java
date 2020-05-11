package pl.akademiaspring.homework_week_3.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.akademiaspring.homework_week_3.models.Car;
import pl.akademiaspring.homework_week_3.repositories.CarRepository;

import java.util.HashMap;
import java.util.Optional;

@Service
public class CarService {
    private final CarRepository carRepository;

    @Autowired
    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public Iterable<Car> getCars() {
        return carRepository.findAll();
    }

    public Car getCar(Long id) {
        return carRepository.findById(id).orElse(null);
    }

    public Car deleteCar(Long id) {
        Optional<Car> car = Optional.of(getCar(id));
        carRepository.deleteById(id);
        return car.orElse(null);
    }

    public Car postCar(Car car) {
        return carRepository.save(car);
    }

    public Car putCar(Long id, Car car) {
        car.setId(id);
        return carRepository.save(car);
    }

    public Car patchCar(Long id, HashMap<String, String> modifyData) {
        Optional<Car> car = Optional.of(getCar(id));
        if(car.isEmpty()) {
            return null;
        }
        if(modifyData.containsKey("mark")) {
            car.get().setMark(modifyData.get("mark"));
        }
        if(modifyData.containsKey("model")) {
            car.get().setMark(modifyData.get("model"));
        }
        if(modifyData.containsKey("color")) {
            car.get().setMark(modifyData.get("color"));
        }
        return postCar(car.get());
    }

    public Iterable<Car> getCarByColor(String color) {
        return carRepository.findAllByColor(color);
    }
}
