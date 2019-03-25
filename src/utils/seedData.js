import Chance from 'chance';
import Truck from '../models/Truck';
import Issue from '../models/Issue';
import Maintenance from '../models/Maintenance';
import Trip from '../models/Trip';

const chance = new Chance();

const pickId = models => chance.pickone(models.map(m => m._id));

export default async function seedData() {
  const trucks = await Truck.create([...Array(10)].map(() => ({
    name: chance.word(),
    location: chance.address(),
    vin: chance.guid(),
    plates: chance.string({ length: 6 }),
    year: chance.integer({ min: 1950, max: 2050 }),
    make: chance.string(),
    model: chance.string(),
    tireSize: chance.integer(),
    boughtDate: chance.date({ year: 2015 }),
    registration: chance.url(),
    insurance: chance.url(),
    inUse: chance.bool()
  })));

  const issues = await Issue.create([...Array(100)].map(() => ({
    reportedDate: chance.date({ year: 2018 }),
    user: chance.string({ length: 10 }),
    description: chance.paragraph(),
    resolvedDate: chance.pickone([chance.date({ year: 2019 }), null]),
    truck: pickId(trucks)
  })));

  await Maintenance.create([...Array(50)].map(() => ({
    startDate: chance.date({ year: 2018 }),
    user: chance.string({ length: 10 }),
    truck: pickId(trucks),
    levelOfUrgency: chance.pickone(['Very Urgent', 'Moderately Urgent', 'Not Urgent', 'Unknown']),
    type: chance.pickone(['Routine', 'Corrective']),
    resolvedDate: chance.date({ year: 2019 }),
    descriptionOfMaintenancePerformed: {
      description: chance.paragraph(),
      receipt: chance.word(),
      cost: chance.floating({ fixed: 2, min: 0 }),
      garage: chance.string()
    },
    issueOpen: true,
    issueId: pickId(issues)
  })));

  await Trip.create([...Array(1000)].map(() => ({
    user: chance.string({ length: 10 }),
    startDate: chance.date(),
    endDate: chance.date(),
    tripPurpose: chance.paragraph(),
    startLocation: chance.address(),
    endLocation: chance.address(),
    truck: pickId(trucks)
  })));
}
