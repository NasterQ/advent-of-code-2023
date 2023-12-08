package day8

def calculateSteps(instruction: String, directions: List[Node]) = {

  val startNode: Node = directions.find((node: Node) => node.baseNode == "AAA").get
  val translatedInstructions: List[Int] =
    instruction.split("").toList.map((letter: String) => directionValues(letter))

  def traverse(currInstructions: List[Int], currNode: Node, steps: Int = 0): Int = {
    if (currNode.baseNode == "ZZZ") steps
    else if (currInstructions.length == 0) traverse(translatedInstructions, currNode, steps)
    else
      traverse(
        currInstructions.tail,
        directions
          .find((node: Node) => node.baseNode == currNode.routes(currInstructions.head))
          .get,
        steps + 1
      )
  }

  traverse(translatedInstructions, startNode)
}

@main def part1: Unit = {
  val mapData: List[String] = loadData("src/main/data/data.txt")
  val instructions: String = mapData(0)
  val directions: List[Node] = getDirections(mapData)
  val steps: Int = calculateSteps(instructions, directions)
  println(steps)
}
