import os


# def check_for_node_mods(path):
#     # reccursively check for node_modules
#     for root, dirs, files in os.walk(path):
#         if "node_modules" in dirs:
#             return True
#         if "site-packages" in dirs:
#             return True
        
#     return False


# projects = []

# for folder in os.listdir("../"):
#     if os.path.isdir("../" + folder):
#         projects.append(folder)

# print(projects)

# new_projects = []

# for project in projects:
#     if check_for_node_mods("../" + project):
#         print("- " + project + " has node_modules")
#     else:
#         new_projects.append(project)
#         print(project + " does not have node_modules")

# print(new_projects)

# # copy all folders in new_projects to a new folder called temp
# if not os.path.exists("temp"):
#     os.mkdir("temp")

# for project in new_projects:
#     os.system("xcopy /E /I /Y ..\\" + project + " temp\\" + project)

file_svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z"/></svg>'
folder_svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 96C0 60.7 28.7 32 64 32H196.1c19.1 0 37.4 7.6 50.9 21.1L289.9 96H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16H286.6c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7H64z"/></svg>'

def create_html(root):
    for dirpath, dirnames, filenames in os.walk(root):
        with open(os.path.join(dirpath, "_.html"), "w") as f:
            f.write('<html><head><meta charset="UTF-8" /><title>TDFileExplorer</title><style>html,body {font-family: sans-serif;}h1 {text-align: center;} svg {width: 15px; height: 15px;}</style></head><body><h1>TDFileExplorer</h1>\n')
            for dirname in dirnames:
                f.write(f'<p> {folder_svg} <a href="{dirname}/_.html" title="{dirname}">{dirname}</a></p>\n')
            for filename in filenames:
                if filename != "_.html":
                    f.write(f'<p> {file_svg} <a href="{filename}" title="{filename}">{filename}</a></p>\n')

            f.write(
                '<script type="module">import{ initializeApp} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js"; import{ getAnalytics} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js"; import{ getDatabase} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"; import{ set, ref, get,} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"; const firebaseConfig={ apiKey: "AIzaSyAnCVDDAwpgPHqiRhn0G61emypC3s5Zw_o", authDomain: "tdprojecthub.firebaseapp.com", projectId: "tdprojecthub", storageBucket: "tdprojecthub.appspot.com", messagingSenderId: "989245812111", appId: "1:989245812111:web:ff4d83f814d15481ab6ffa", measurementId: "G-BJN52JFF4D", datbaseURL: "https://tdprojecthub-default-rtdb.firebaseio.com/",}; const app=initializeApp(firebaseConfig); const analytics=getAnalytics(app); const db=getDatabase(app); window.db=db; window.set=set; window.ref=ref; window.get=get; async function wait(ms){ return new Promise((resolve)=>setTimeout(resolve, ms));} for (let i=0; i < document.links.length; i++){ document.links[i].addEventListener("click", async function (e){ e.preventDefault(); let link_name=e.target.href .substring( "src".length + e.target.href.indexOf("src") + 1 ) .split("/"); if (link_name.length===1) link_name="root"; else link_name=link_name[0]; const date=new Date().toISOString().split("T")[0]; get(ref(db, date + "/links/" + link_name)).then( (snapshot)=>{ if (snapshot.exists()){ set( ref(db, date + "/links/" + link_name), snapshot.val() + 1 );} else{ set(ref(db, date + "/links/" + link_name), 1);}} ); await wait(200); document.location.href=e.target.href;});} </script>')
            f.write("</body></html>")

create_html("src")
