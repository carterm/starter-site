---
title: More Pages
description: Next Level
---

# Sample Site

Some Text

## Next heading

Some Text

<table class="table table-striped table-bordered table-sm">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col" class="text-center">Job</th>
      <th scope="col" class="text-center">Favorite Color</th>
    </tr>
  </thead>
  <tbody>
    {% for myrow in somedata %}
    <tr>
      <th scope="row">{{myrow.Name}}</th>
      <td>
        {{myrow.Job}}</td>
      <td>{{myrow.FavoriteColor}}
      </td>
    </tr>
    {% endfor %}
  </tbody>
</table>
