import './App.css';

function Homepage() {
    return (
        <div class="body-container">
        <div class="instructions-container">
            <h2>Instructions:</h2>
            <p>Please ensure that your spreadsheet is in the correct format:</p>
            <ol>
                <li>The first row should contain the Student's Name, ID, and any assignments given.</li>
                <li>Corresponding data should be inputted in the subsequent rows.</li>
                <li>Click on "Upload a Spreadsheet" to select your spreadsheet file.</li>
                <li>Once a spreadsheet has been uploaded, click "Generate PDF" to process the file into a PDF.</li>
            </ol>
        </div>
        <div class="buttons-container">
            <button class="upload-spreadsheet">Upload a Spreadsheet</button>
            <button class="generate-pdf">Generate PDF</button>
            <button class="visualize-stats">Visualize Class Statistics</button>
        </div>
        <div class="table-container" contenteditable>
            <table>
                <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Student ID</th>
                    <th>Exam 1</th>
                    <th>Exam 2</th>
                    <th>HW 1</th>
                    <th>HW 2</th>
                    <th>HW 3</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>John Doe</td>
                    <td>001</td>
                    <td>67</td>
                    <td>85</td>
                    <td>80</td>
                    <td>72</td>
                    <td>68</td>
                </tr>
                <tr>
                    <td>Jane Doe</td>
                    <td>002</td>
                    <td>80</td>
                    <td>81</td>
                    <td>95</td>
                    <td>78</td>
                    <td>90</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="profile-container">
            <div class="image-container">
                <img src="image.jpg" alt="Profile Picture">
            </div>
            <p>Instructor</p>
            <div class="courses-container">
                <table>
                    <thead>
                    <h3>Courses</h3>
                    <div class="search-container">
                        <input type="text" placeholder="Search for a course">
                    </div>
                    </thead>
                    <tbody>
                    <tr><img src="image1.jpg" alt="Course 1 picture"> Math Period 1</tr><br>
                        <tr><img src="image2.jpg" alt="Course 2 picture"> Math Period 2</tr><br>
                        <tr><img src="image3.jpg" alt="Course 3 picture"> Science Period 1</tr><br>
                        <tr><img src="image4.jpg" alt="Course 4 picture"> Science Period 2</tr><br>
                    </tbody>
                </table>
            </div>
        </div>

        );
}

export default Homepage;