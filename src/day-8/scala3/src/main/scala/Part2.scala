package day8

def calculateSimultaneuosSteps(instruction: String, directions: List[Node]) = {

  val startNodes: List[Node] = directions.filter((node: Node) => node.baseNode.endsWith("A"))
  val translatedInstructions: List[Int] =
    instruction.split("").toList.map((letter: String) => directionValues(letter))

  // println(startNodes.forall((node: Node) => node.baseNode.endsWith("A")))
  val exampleNodes = List(
    Node("11A", List("11B", "XXX")),
    Node("11B", List("XXX", "11Z")),
    Node("11Z", List("11B", "XXX"))
  )
  // println("=============")
  // println(exampleNodes.map(_.routes))
  // println(
  //   directions
  //     .filter((node: Node) => exampleNodes.flatMap(_.routes).contains(node.baseNode))
  // )
  // println("=============")

  def traverse(currInstructions: List[Int], currNodes: List[Node], steps: Int = 0): Int = {
    println(s"$steps $currNodes")
    if (currNodes.forall((node: Node) => node.baseNode.endsWith("Z"))) steps
    else if (currInstructions.length == 0) traverse(translatedInstructions, currNodes, steps)
    else
      traverse(
        currInstructions.tail,
        directions
          .filter((node: Node) => currNodes.flatMap(_.routes).contains(node.baseNode)),
        steps + 1
      )

  }

  def dispatcher(
      currInstructions: List[Int],
      currentNodes: List[Node],
      currentValues: List[Node] = List[Node](),
      steps: Int = 0
  ) = {}

  dispatcher(translatedInstructions, startNodes)
}

@main def part2: Unit = {
  val mapData = loadData("src/main/data/test-data-3.txt")
  val instructions: String = mapData(0)
  val directions: List[Node] = getDirections(mapData)
  println(directions)
  val steps: Any = calculateSimultaneuosSteps(instructions, directions)
  println(steps)
}
