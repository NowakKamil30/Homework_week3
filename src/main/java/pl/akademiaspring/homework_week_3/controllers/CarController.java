package pl.akademiaspring.homework_week_3.controllers;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.akademiaspring.homework_week_3.models.Car;
import pl.akademiaspring.homework_week_3.services.CarService;

import java.util.HashMap;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

@RestController
@RequestMapping(value = "/cars", produces = {
        MediaType.APPLICATION_XML_VALUE,
        MediaType.APPLICATION_JSON_VALUE})
public class CarController {

    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping()
    public ResponseEntity<CollectionModel<Car>> getCars() {
        Iterable<Car> cars = carService.getCars();
        if(cars != null) {
            cars.forEach(car -> car.add(linkTo(CarController.class)
                    .slash(car.getId())
                    .withSelfRel()));
            Link link = linkTo(CarController.class).withSelfRel();
            CollectionModel<Car> carCollectionModel = new CollectionModel<>(cars,link);
            return new ResponseEntity<>(carCollectionModel, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }



    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        Link link = linkTo(CarController.class).slash(id).withSelfRel();
        Car car = carService.getCar(id);
        if(car != null) {
            car.add(link);
            return new ResponseEntity<>(car, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/colors/{color}")
    public ResponseEntity<CollectionModel<Car>> getCarsByColor(@PathVariable(value = "color") String color) {
        Iterable<Car> cars = carService.getCarByColor(color);
        if(cars != null) {
            cars.forEach(car -> car.add(linkTo(CarController.class)
                    .slash(car.getId())
                    .withSelfRel()));
            cars.forEach(car -> car.add(linkTo(CarController.class)
                    .withRel("allColors")));
            cars.forEach(car -> car.add(linkTo(CarController.class)
                    .slash("colors")
                    .slash(car.getColor())
                    .withRel("colors")));
            Link link = linkTo(CarController.class).withSelfRel();
            CollectionModel<Car> carCollectionModel = new CollectionModel<>(cars,link);
            return new ResponseEntity<>(carCollectionModel, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PostMapping
    public ResponseEntity postCar(@RequestBody Car car) {
        Car saveCar = carService.postCar(car);
        if(saveCar != null) {
            return new ResponseEntity(HttpStatus.CREATED);
        }
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/{id}")
    public ResponseEntity putCar(@PathVariable Long id ,@RequestBody Car car) {
        Car saveCar = carService.putCar(id, car);
        if(saveCar != null) {
            return new ResponseEntity(HttpStatus.CREATED);
        }
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PatchMapping("/{id}")
    public ResponseEntity patchCar(@PathVariable Long id ,@RequestBody HashMap<String, String> modifyData) {
        Car saveCar = carService.patchCar(id, modifyData);
        if(saveCar != null) {
            return new ResponseEntity(HttpStatus.CREATED);
        }
        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Car> deleteCarById(@PathVariable Long id) {
        Car car = carService.deleteCar(id);
        if(car != null) {
            return new ResponseEntity<>(car, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
