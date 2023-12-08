case class Node(baseNode: String, routes: List[String])

def data: List[String] = {
  import scala.io.Source
  val plik = Source.fromFile("src/main/data/data.txt", "UTF-8")
  plik.getLines.toList
}

def getDirections(dataString: List[String]): List[Node] = {
  val directionsArray = dataString.slice(2, dataString.length).map((row) => row.split(" = ").toList)

  val directions = directionsArray.foldLeft(List[Node]())((directionsList, directionRow) => {
    val baseNode = directionRow(0)
    val routes = directionRow(1).replaceAll("[()]", "").split(", ").toList
    directionsList :+ Node(baseNode, routes)
  })
  directions
}

def calculateSteps(instruction: String, directions: List[Node]) = {
  val directionValues: Map[String, Int] = Map(
    "L" -> 0,
    "R" -> 1
  )

  val startNode: Node = directions.find((node: Node) => node.baseNode == "AAA").get
  val translatedInstructions: List[Int] =
    instruction.split("").toList.map((letter: String) => directionValues(letter))

  def traverse(currInstructions: List[Int], currNode: Node, steps: Int = 0): Int = {
    if (currNode.baseNode == "ZZZ") steps
    else if (currInstructions.length == 0) traverse(translatedInstructions, currNode, steps)
    else
      traverse(
        currInstructions.tail,
        directions.find((node: Node) => node.baseNode == currNode.routes(currInstructions(0))).get,
        steps + 1
      )
  }

  traverse(translatedInstructions, startNode)
}

@main def part1: Unit = {
  val instructions: String = data(0)
  val directions: List[Node] = getDirections(data)
  val steps: Int = calculateSteps(instructions, directions)
  println(steps)
}
