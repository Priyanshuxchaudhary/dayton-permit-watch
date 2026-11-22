function r(t){return t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}function c(t){const e=d=>`<td>${r(d)}</td>`,o=t.recordDetailsLink?`<td><a href="${r(t.recordDetailsLink)}">View Record</a></td>`:"<td></td>";return`<tr>${e(t.recordNumber)}${e(t.recordType)}${e(t.projectName)}${e(t.address)}${e(t.expirationDate)}${e(t.shortNotes)}${o}</tr>`}export function renderDigest(t){const{records:e,permitTypeLabels:o,startDate:d,endDate:a}=t,i=t.portalUrl??"https://aca-prod.accela.com/DAYTON/Cap/CapHome.aspx?module=Building&TabName=Building",n=o.map(s=>`${r(s)} <br />`).join(`
            `),l=e.length?`
        <h2>Discovered Records:</h2>
        <table>
            <thead>
                <tr>
                    <th>Record Number</th>
                    <th>Record Type</th>
                    <th>Project Name</th>
                    <th>Address</th>
                    <th>Expiration Date</th>
                    <th>Short Notes</th>
                    <th>Record Link</th>
                </tr>
            </thead>
            <tbody>
                ${e.map(c).join(`
                `)}
            </tbody>
        </table>`:"<p>No records found.</p>";return`<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Demolition Notice</title>
        <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px 12px; border: 1px solid #ddd; text-align: left; }
            th { background-color: #f2f2f2; }
        </style>
    </head>
    <body>
        <p>This email contains the following record types submitted between ${r(d)} and ${r(a)}:</p>
        ${n}
        <p>For details, see the <a href="${r(i)}">Building Services Portal</a>.</p>
        ${l}
    </body>
</html>`}
