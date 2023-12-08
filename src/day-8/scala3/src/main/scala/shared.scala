package day8

case class Node(baseNode: String, routes: List[String])

val directionValues: Map[String, Int] = Map(
  "L" -> 0,
  "R" -> 1
)

def loadData(fileName: String): List[String] = {
  import scala.io.Source
  val plik = Source.fromFile(fileName, "UTF-8")
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
