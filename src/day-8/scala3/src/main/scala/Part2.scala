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

  def traverse(currInstruction: Int, currNode: Node): Node =
    directions.find((node: Node) => node.baseNode == currNode.routes(currInstruction)).get

  def dispatcher(
      currInstructions: List[Int],
      currentNodes: List[Node],
      pathQuantity: Int,
      obtainedNodes: List[Node] = List[Node](),
      steps: Int = 0
  ) = {
    if (currentNodes.forall((node: Node) => node.baseNode.endsWith("Z"))) steps
    else if (currInstructions.length == 0)
      dispatcher(translatedInstructions, currentNodes, currentNodes.length, obtainedNodes, steps)
    else 3
  }

  dispatcher(translatedInstructions, startNodes, startNodes.length)
}

@main def part2: Unit = {
  val mapData = loadData("src/main/data/test-data-3.txt")
  val instructions: String = mapData(0)
  val directions: List[Node] = getDirections(mapData)
  println(directions)
  val steps: Any = calculateSimultaneuosSteps(instructions, directions)
  println(steps)
}
