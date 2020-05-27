/*
    File containing example automata to load into Dropdown
*/

let ants = `#N Ants
#C An orthogonal period 5 lightspeed wick.
#C www.conwaylife.com/wiki/index.php?title=Ants
x = 44, y = 6, rule = B3/S23
$2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o2b$2b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o
3b2o$2b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o3b2o$2o3b2o3b2o3b2o3b2o3b2o3b2o3b
2o3b2o!`;

let beacon = `#N Beacon
#O John Conway
#C A common period 2 oscillator.
#C www.conwaylife.com/wiki/index.php?title=Beacon
x = 4, y = 4, rule = B3/S23
2o2b$o3b$3bo$2b2o!`;

let blinker = `#N Blinker
#O John Conway
#C A period 2 oscillator that is the smallest and most common oscillator.
#C www.conwaylife.com/wiki/index.php?title=Blinker
x = 3, y = 3, rule = B3/S23
$3o!`;

let bunny = `#N Bunnies
#O Robert Wainwright and Andrew Trevorrow
#C A methuselah and parent of rabbits with lifespan 17332.
#C Benefits from larger grid
#C www.conwaylife.com/wiki/index.php?title=Bunnies
x = 8, y = 4, rule = B3/S23
o5bob$2bo3bob$2bo2bobo$bobo!`;

let copperhead = `#N Copperhead
#O 'zdr'
#C An c/10 orthogonal spaceship found on March 5, 2016.
#C http://www.conwaylife.com/wiki/Copperhead
x = 10, y = 30, rule = B3/S23
18$2b2o2b2o$4b2o$4b2o$bobo2bobo$bo6bo2$bo6bo$2b2o2b2o$3b4o2$4b2o$4b2o!`;

let flower = `#N Garden of Eden 5
#O Nicolay Beluchenko
#C Was the smallest-known Garden of Eden in Conway's Game of Life until
#C it was surpassed by Garden of Eden 6 in December 2011.
#C www.conwaylife.com/wiki/index.php?title=Garden_of_Eden_5
x = 11, y = 11, rule = b3/s23
b3o2b2o3b$b2obobob3o$b3o2b5o$obobobobobo$4obobobob$4b3o4b$bobobob4o$ob
obobobobo$5o2b3ob$3obobob2ob$3b2o2b3o!`;

let glider = `#N Glider
#O Richard K. Guy
#C The smallest, most common, and first discovered spaceship. Diagonal, has period 4 and speed c/4.
#C www.conwaylife.com/wiki/index.php?title=Glider
x = 20, y = 20, rule = B3/S23
bob$2bo$3o!`;

let gosper = `#N Gosper glider gun
#O Bill Gosper
#C A true period 30 glider gun.
#C The first known gun and the first known finite pattern with unbounded growth.
#C www.conwaylife.com/wiki/index.php?title=Gosper_glider_gun
x = 36, y = 15, rule = B3/S23
24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8b
o3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o!`;

let maze = `#N Maze
#O David Kohler
#C A random maze created by me to demonstrate the maze ruleset
x = 30, y = 30, rule = B3/S12345
7bo2bo17bo$2o10bo9bo$7bobo10bo$4bo4bobobo$5bo3bo2b2o6bo$8bo2bo6bo4bo2b
2o$o2bo3bobo7bo$bo$bo16bo2bo6bo$5bo11bo9bo$8bo17bo$12b2o3bobobo2bo4bo$
o7bo6bo2bobo5bo$11bo6b2o$5bo5bo10bo2bobo$13bo8bo3bo2bo$bo13bo12bo$9bo
2b2o11bo$5bo23bo$4bo14b2o8bo$12bo14bobo$bo9bo12bo$11bo14bobo$16bo3bo$
27b2o$obo3bo5bobo$7bo15bo3bo$5bo3bo6bo10bobo$obo4bo18bo$4bo2b2o4bo2bo
4b2o!`;

let sawtooth = `#N Moving sawtooth
#O David Bell
#C A moving sawtooth that was found on July 10, 2005.
#C Recommend making cell size small
#C www.conwaylife.com/wiki/index.php?title=Moving_sawtooth
x = 128, y = 200, rule = B3/S23
27$20b3o17b3o26bo4b3o17b3o17b3o11b$15b2ob2obo19bob2ob2o20b3o2bo2bo12b2ob
2obo19bob2ob2o6b$15b2o4bob2o13b2obo4b2o13b3o4bob2o4bo12b2o4bob2o13b2ob
o4b2o6b$14bo2bo3bobobo11bobobo3bo2bo11bo2bo5b4o3bo11bo2bo3bobobo11bobo
bo3bo2bo5b$21bobobob2o5b2obobobo21bo5b3o4bo18bobobob2o5b2obobobo12b$
19bo3bobob2o5b2obobo3bo15bo3bo9bobo17bo3bobob2o5b2obobo3bo10b$20bobobo
b3o5b3obobobo16bo3bo30bobobob3o5b3obobobo11b$63bo4bo59b$24b3o9b3o21bob
o5bo29b3o9b3o15b$24b3obobobobob3o29bo29b3obobobobob3o15b$25b5obob5o61b
5obob5o16b$30bobo35bo35bobo21b$30b3o35bo35b3o21b$27bobo3bobo32bo32bobo
3bobo18b2$25b2ob3ob3ob2o30bo30b2ob3ob3ob2o16b$25bo11bo30bo30bo11bo16b$
24bo2bo7bo2bo29bo29bo2bo7bo2bo15b$24bo4bo3bo4bo59bo4bo3bo4bo15b$29bo3b
o34bo34bo3bo20b$23b6o5b6o28bo28b6o5b6o14b$22b2o7bo7b2o27bo27b2o7bo7b2o
13b$30bobo71bobo21b$30b3o12bo9bo12bo12bo9bo12b3o21b$43b4o7b4o10bo10b4o
7b4o34b$19bo19b2ob2o3bo5bo3b2ob2o6bo6b2ob2o3bo5bo3b2ob2o19bo10b$17b4o
18b2o2bo3bo5bo3bo2b2o13b2o2bo3bo5bo3bo2b2o18b4o8b$13b2ob2o3bo3bo12bo2b
o7bobo7bo2bo11bo2bo7bobo7bo2bo12bo3bo3b2ob2o4b$13b2o2bo5b4o19bo2bobo2b
o27bo2bobo2bo19b4o5bo2b2o4b$12bo2bo7bo3bo17b3obobob3o25b3obobob3o17bo
3bo7bo2bo3b$21bo2bobo83bobo2bo12b$22bo7b3o14b2o3b2o29b2o3b2o14b3o7bo
13b$33b2o12b2o3b2o29b2o3b2o12b2o24b$29bo4bo12bobobobo29bobobobo12bo4bo
20b$29bo4bo11b2obobob2o27b2obobob2o11bo4bo20b$29bo3bo12b2obobob2o27b2o
bobob2o12bo3bo20b$31bo17bobo33bobo17bo22b$45bo9bo25bo9bo36b$46bo7bo27b
o7bo37b3$45bo45bo36b$46b2o41b2o37b$45b2o43b2o36b26$8b3o17b3o97b$3b2ob
2obo19bob2ob2o92b$3b2o4bob2o13b2obo4b2o92b$2bo2bo3bobobo11bobobo3bo2bo
91b$9bobobob2o5b2obobobo28bobo15bobo49b$7bo3bobob2o5b2obobo3bo27b2o15b
2o50b$8bobobob3o5b3obobobo28bo17bo50b2$12b3o9b3o101b$12b3obobobobob3o
21b3o35b3o39b$13b5obob5o18bob2o3bo33bo3b2obo35b$18bobo22b3o3b3o2b3o23b
3o2b3o3b3o34b$18b3o21bo3bo4b3obobo21bobob3o4bo3bo33b$15bobo3bobo19bo7b
o4bo23bo4bo7bo34b$52b2o29b2o43b$13b2ob3ob3ob2o102b$13bo11bo102b$12bo2b
o7bo2bo101b$12bo4bo3bo4bo101b$17bo3bo75b3o17b3o8b$11b6o5b6o64b2ob2obo
19bob2ob2o3b$10b2o15b2o63b2o4bob2o13b2obo4b2o3b$19bo71bo2bo3bobobo11bo
bobo3bo2bo2b$17b2ob2o11bo9bo54bobobob2o5b2obobobo9b$18bobo10b4o7b4o50b
o3bobob2o5b2obobo3bo7b$7bo11bo7b2ob2o3bo5bo3b2ob2o47bobobob3o5b3obobob
o8b$5b4o18b2o2bo3bo5bo3bo2b2o78b$b2ob2o3bo3bo12bo2bo7bobo7bo2bo50b3o9b
3o12b$b2o2bo5b4o19bo2bobo2bo58b3obobobobob3o12b$o2bo7bo3bo17b3obobob3o
58b5obob5o13b$9bo2bobo51b2ob2o36bobo18b$10bo24b2o3b2o24b2ob2o36b3o18b$
35b2o3b2o62bobo3bobo15b$22b2o11bobobobo86b$17b2o4b2o9b2obobob2o59b2ob
3ob3ob2o13b$17b2o3b2o10b2obobob2o59bo11bo13b$17b2o3bo14bobo61bo2bo7bo
2bo12b$33bo9bo57bo4bo3bo4bo12b$34bo7bo63bo3bo17b$100b6o5b6o11b$99b2o7b
o7b2o10b$107bobo18b$84bo9bo12b3o18b$82b4o7b4o31b$78b2ob2o3bo5bo3b2ob2o
19bo7b$78b2o2bo3bo5bo3bo2b2o18b4o5b$77bo2bo7bobo7bo2bo12bo3bo3b2ob2ob$
85bo2bobo2bo19b4o5bo2b2ob$66b2ob2o13b3obobob3o17bo3bo7bo2bo$66b2ob2o
42bobo2bo9b$86b2o3b2o14b3o7bo10b$86b2o3b2o12b2o21b$86bobobobo12bo4bo
17b$85b2obobob2o11bo4bo17b$85b2obobob2o12bo3bo17b$88bobo17bo19b$84bo9b
o33b$85bo7bo34b2$40bobo85b$41b2o51bo33b$41bo50b2o34b$93b2o33b4$66b2ob
2o57b$66b2ob2o57b17$66b2ob2o57b$66b2ob2o57b5$54bo73b$55b2o71b$54b2o23b
obo46b$79b2o47b$80bo47b8$66b2ob2o57b$66b2ob2o!`;

let penta = `#N Pentadecathlon
#O John Conway
#C 10 cells placed in a row evolve into this object,
#C which is the most natural oscillator of period greater than 3. 
#C In fact, it is the fifth or sixth most common oscillator overall, 
#C being about as frequent as the clock, but much less frequent than the blinker, 
#C toad, beacon or pulsar.
#C www.conwaylife.com/wiki/index.php?title=Pentadecathlon
x = 16, y = 9, rule = B3/S23
3$5bo4bo2b$3b2ob4ob2o$5bo4bo!`;

let puffer = `#N Pufferfish
#O Richard Schank
#C An almost natural c/2 puffer, discovered in November 2014.
#C www.conwaylife.com/wiki/Pufferfish
x = 17, y = 40, rule = B3/S23
28$4bo7bo$3b3o5b3o$2b2o2bo3bo2b2o$4b3o3b3o2$5bo5bo$3bo2bo3bo2bo$bo5bobo5bo$
b2o4bobo4b2o$7bobo$4bobo3bobo$5bo5bo!`;

let pulsar = `#N Pulsar
#O John Conway
#C A period 3 oscillator. Despite its size, this is the fourth most common oscillator (and by
#C far the most common of period greater than 2).
#C www.conwaylife.com/wiki/index.php?title=Pulsar
x = 15, y = 15, rule = B3/S23
$b2b3o3b3o2b2$bo4bobo4bo$bo4bobo4bo$bo4bobo4bo$b2b3o3b3o2b2$b2b3o3b3o2b$bo4bob
o4bo$bo4bobo4bo$bo4bobo4bo2$b2b3o3b3o!`;

let beeshuttle = `#N Queen bee shuttle
#O Bill Gosper
#C A period 30 oscillator.
#C www.conwaylife.com/wiki/index.php?title=Queen_bee_shuttle
x = 22, y = 7, rule = b3/s23
9bo12b$7bobo12b$6bobo13b$2o3bo2bo11b2o$2o4bobo11b2o$7bobo12b$9bo!`;

let snark = `#N Snark
#O Mike Playle
#C The fastest and smallest 90-degree stable glider reflector (as of
#C June 2013).
#C www.conwaylife.com/wiki/Snark
x = 22, y = 23, rule = B3/S23
6b2o3b2o$6b2o2bob3o$10bo4bo$6b4ob2o2bo$6bo2bobobob2o$9bobobobo$10b2obo
bo$14bo2$2o$bo7b2o$bobo5b2o$2b2o7$12b2o$3b2o7bo$2bobo8b3o$4bo10bo!`;

let rats = `#N $rats
#O David Buckingham
#C A period 6 oscillator found in 1972.
#C www.conwaylife.com/wiki/index.php?title=$rats
x = 12, y = 11, rule = B3/S23
5b2o5b$6bo5b$4bo7b$2obob4o3b$2obo5bobo$3bo2b3ob2o$3bo4bo3b$4b3obo3b$7b
o4b$6bo5b$6b2o!`;

let exampleRLEs = {
  Ants: ants,
  Beacon: beacon,
  Blinker: blinker,
  Bunnies: bunny,
  Copperhead: copperhead,
  'Flower of Eden': flower,
  Glider: glider,
  'Gosper Glider Gun': gosper,
  Maze: maze,
  'Moving Sawtooth': sawtooth,
  Pentadecathlon: penta,
  Pufferfish: puffer,
  Pulsar: pulsar,
  'Queen Bee Shuttle': beeshuttle,
  Snark: snark,
  $rats: rats,
};

export default exampleRLEs;
