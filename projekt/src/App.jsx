import { useState } from 'react'
import './App.css'

const fileSystem = {
  id: 1,
  name: "root",
  type: "folder",
  children: [
    {
      id: 2,
      name: "Dokumenty",
      type: "folder",
      children: [
        { id: 3, name: "CV.pdf", type: "file", size: "245 KB" },
        { id: 4, name: "List motywacyjny.docx", type: "file", size: "128 KB" }
      ]
    },
    {
      id: 5,
      name: "Zdjęcia",
      type: "folder",
      children: [
        { id: 6, name: "wakacje.jpg", type: "file", size: "2.1 MB" },
        { id: 7, name: "rodzina.png", type: "file", size: "1.8 MB" }
      ]
    },
    {
      id: 8,
      name: "readme.txt",
      type: "file",
      size: "1 KB"
    }
  ]
}

function FileExplorer({ node }) {
  const [openFolders, setOpenFolders] = useState({})

  const toggleFolder = (id) => {
    setOpenFolders(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const renderNode = (node) => {
    if (node.type === 'folder') {
      return (
        <li key={node.id}>
          <span
            className="folder"
            onClick={() => toggleFolder(node.id)}
          >
            {openFolders[node.id] ? '📂' : '📁'} {node.name}
          </span>
          {openFolders[node.id] && node.children && (
            <ul className="file-tree-list file-tree-children">
              {node.children.map(child => renderNode(child))}
            </ul>
          )}
        </li>
      )
    }
    return (
      <li key={node.id}>
        <span className="file">📄 {node.name} <span style={{ color: '#888', fontSize: '0.9em' }}>({node.size})</span></span>
      </li>
    )
  }

  return (
    <div className="file-explorer-wrapper">
      <ul className="file-tree-list">
        {renderNode(node)}
      </ul>
    </div>
  )
}

function App() {
  return (
    <div className="app-container">
      <h2>Eksplorator plików</h2>
      <FileExplorer node={fileSystem} />
    </div>
  )
}

export default App